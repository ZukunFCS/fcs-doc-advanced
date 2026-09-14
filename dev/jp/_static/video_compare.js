(function () {
  "use strict";

  // ── Configuration ──────────────────────────────────────────────────
  const VIDEO_BASE = "https://zukunfcs.github.io/artifacts/benchmarks/production_cycle_vs_effort";
  const REFERENCE_VIDEO = "https://zukunfcs.github.io/artifacts/benchmarks/production_cycle_vs_effort/reference_video.mp4";
  const FILE_TEMPLATE = "ROM_s{s}_o{o}.mp4";

  const S_VALUES = [1, 2, 5];
  const O_VALUES = [10, 20, 50, 80];

  const VALID_COMBOS = new Set([
    "s1_o0", "s1_o10", "s1_o20", "s1_o50", "s1_o80",
    "s2_o10", "s2_o20", "s2_o50", "s2_o80",
    "s5_o10", "s5_o20", "s5_o50", "s5_o80",
  ]);

  const MAX_SLOTS = 3;

  // ── Helpers ────────────────────────────────────────────────────────
  function comboKey(s, o) { return `s${s}_o${o}`; }
  function isValid(s, o) { return VALID_COMBOS.has(comboKey(s, o)); }

  function videoUrl(s, o) {
    return `${VIDEO_BASE}/${FILE_TEMPLATE.replace("{s}", s).replace("{o}", o)}`;
  }

  function profileLabel(s, o) {
    const parts = ["ROM(50)"];
    if (s > 0) parts.push(`+${s} same`);
    if (o > 0) parts.push(`+${o} other`);
    return `${parts.join(" ")} = ${50 + s + o} profiles`;
  }

  function fmt(sec) {
    if (isNaN(sec)) return "0:00";
    return `${Math.floor(sec / 60)}:${Math.floor(sec % 60).toString().padStart(2, "0")}`;
  }

  // ── Widget ─────────────────────────────────────────────────────────
  class VideoCompareWidget {
    constructor(root) {
      this.root = root;
      this.slots = [];       // comparison slot objects
      this.refVideo = null;  // the always-on reference <video>
      this.playing = false;
      this.syncing = false;
      this.build();
      this.addSlot(1, 0);
      this.addSlot(5, 50);
    }

    /* Return ALL video elements (ref + slots) for sync */
    allVideos() {
      const vids = [];
      if (this.refVideo) vids.push(this.refVideo);
      for (const s of this.slots) { if (s.video) vids.push(s.video); }
      return vids;
    }

    masterTime() {
      const v = this.allVideos();
      return v.length ? v[0].currentTime : 0;
    }

    duration() {
      for (const v of this.allVideos()) {
        if (v.duration && isFinite(v.duration)) return v.duration;
      }
      return 0;
    }

    // ── Build skeleton ─────────────────────────────────────────────
    build() {
      this.root.innerHTML = "";
      this.root.classList.add("vc-widget");

      // Controls bar
      const ctrl = document.createElement("div");
      ctrl.className = "vc-controls";

      this.playBtn = this._btn("Play", () => this.togglePlay());
      this.resetBtn = this._btn("Reset", () => this.resetAll());
      this.resetBtn.className += " vc-btn-secondary";

      this.timeline = Object.assign(document.createElement("input"), {
        type: "range", className: "vc-timeline", min: 0, max: 1000, value: 0,
      });
      this.timeline.oninput = () => this.seekAll((this.timeline.value / 1000) * this.duration());

      this.timeLbl = document.createElement("span");
      this.timeLbl.className = "vc-time-display";
      this.timeLbl.textContent = "0:00 / 0:00";

      ctrl.append(this.playBtn, this.resetBtn, this.timeline, this.timeLbl);
      this.root.appendChild(ctrl);

      // Strip (flex row of columns)
      this.strip = document.createElement("div");
      this.strip.className = "vc-strip";
      this.root.appendChild(this.strip);

      // Reference column (always first)
      this.refCol = this._makeCol("Reference (Source)", true);
      this.strip.appendChild(this.refCol.el);
      this._loadRefVideo();

      // Add-slot button (always last in the strip)
      this.addBtn = document.createElement("button");
      this.addBtn.className = "vc-add-col";
      this.addBtn.textContent = "+";
      this.addBtn.title = "Add comparison slot";
      this.addBtn.onclick = () => this.addSlot(2, 20);
      this.strip.appendChild(this.addBtn);

      // RAF tick
      this._raf = null;
      this._tick = () => {
        this._updateTimeline();
        this._raf = requestAnimationFrame(this._tick);
      };
    }

    _btn(text, fn) {
      const b = document.createElement("button");
      b.textContent = text;
      b.onclick = fn;
      return b;
    }

    // ── Reference video (always on) ────────────────────────────────
    _loadRefVideo() {
      const v = document.createElement("video");
      v.src = REFERENCE_VIDEO;
      v.preload = "auto";
      v.muted = true;
      v.playsInline = true;
      this.refCol.videoWrap.appendChild(v);

      const lbl = document.createElement("div");
      lbl.className = "vc-video-label";
      lbl.textContent = "Source video";
      this.refCol.videoWrap.appendChild(lbl);

      this.refVideo = v;
    }

    // ── Column factory ─────────────────────────────────────────────
    _makeCol(title, isRef) {
      const col = document.createElement("div");
      col.className = "vc-col" + (isRef ? " vc-ref" : "");

      const header = document.createElement("div");
      header.className = "vc-col-header";
      const titleEl = document.createElement("span");
      titleEl.className = "vc-col-title";
      titleEl.textContent = title;
      header.appendChild(titleEl);
      col.appendChild(header);

      const videoWrap = document.createElement("div");
      videoWrap.className = "vc-video-wrap";
      col.appendChild(videoWrap);

      return { el: col, titleEl, header, videoWrap };
    }

    // ── Comparison slots ───────────────────────────────────────────
    addSlot(defaultS, defaultO) {
      if (this.slots.length >= MAX_SLOTS) return;

      const slot = { s: defaultS, o: defaultO, video: null };
      const col = this._makeCol(`Slot ${this.slots.length + 1}`, false);
      slot.col = col;

      // Remove button
      const rm = document.createElement("button");
      rm.className = "vc-col-remove";
      rm.textContent = "\u2715";
      rm.onclick = () => this.removeSlot(slot);
      col.header.appendChild(rm);

      // Sliders (inserted between header and video)
      const sliderArea = document.createElement("div");
      sliderArea.className = "vc-sliders";
      sliderArea.appendChild(this._makeSlider("Production Cycle", "Early", "Late", O_VALUES, defaultO, (v) => { slot.o = v; this._loadSlotVideo(slot); }));
      sliderArea.appendChild(this._makeSlider("Effort per Video", "Less", "More", S_VALUES, defaultS, (v) => { slot.s = v; this._loadSlotVideo(slot); }));
      col.el.insertBefore(sliderArea, col.videoWrap);

      this.slots.push(slot);
      this.strip.insertBefore(col.el, this.addBtn);
      this._loadSlotVideo(slot);
      this._updateUI();
    }

    removeSlot(slot) {
      if (this.slots.length <= 1) return;
      const idx = this.slots.indexOf(slot);
      if (idx === -1) return;
      if (slot.video) slot.video.pause();
      this.slots.splice(idx, 1);
      slot.col.el.remove();
      this._updateUI();
    }

    _updateUI() {
      this.addBtn.style.display = this.slots.length >= MAX_SLOTS ? "none" : "";
      this.slots.forEach((s, i) => { s.col.titleEl.textContent = `Slot ${i + 1}`; });
    }

    // ── Slider factory ─────────────────────────────────────────────
    _makeSlider(label, leftLbl, rightLbl, values, defaultVal, onChange) {
      const g = document.createElement("div");
      g.className = "vc-slider-group";

      const row = document.createElement("div");
      row.className = "vc-slider-label";
      const lt = document.createElement("span");
      lt.textContent = label;
      const vt = document.createElement("span");
      vt.className = "vc-slider-value";
      vt.textContent = defaultVal;
      row.append(lt, vt);

      const inp = Object.assign(document.createElement("input"), {
        type: "range", min: 0, max: values.length - 1,
        value: values.indexOf(defaultVal), step: 1,
      });
      inp.oninput = () => {
        const v = values[parseInt(inp.value)];
        vt.textContent = v;
        onChange(v);
      };

      const ax = document.createElement("div");
      ax.className = "vc-slider-axis-labels";
      ax.innerHTML = `<span>\u2190 ${leftLbl}</span><span>${rightLbl} \u2192</span>`;

      g.append(row, inp, ax);
      return g;
    }

    // ── Video loading ──────────────────────────────────────────────
    _loadSlotVideo(slot) {
      const wrap = slot.col.videoWrap;
      const curTime = this.masterTime();
      const wasPlaying = this.playing;

      if (slot.video) { slot.video.pause(); slot.video.remove(); slot.video = null; }
      wrap.innerHTML = "";

      if (!isValid(slot.s, slot.o)) {
        const msg = document.createElement("div");
        msg.className = "vc-no-video";
        msg.textContent = `No data for s=${slot.s}, o=${slot.o}`;
        wrap.appendChild(msg);
        return;
      }

      const v = document.createElement("video");
      v.src = videoUrl(slot.s, slot.o);
      v.preload = "auto";
      v.muted = true;
      v.playsInline = true;

      v.addEventListener("loadedmetadata", () => {
        v.currentTime = curTime;
        if (wasPlaying) v.play().catch(() => {});
      });

      const lbl = document.createElement("div");
      lbl.className = "vc-video-label";
      lbl.textContent = profileLabel(slot.s, slot.o);

      wrap.append(v, lbl);
      slot.video = v;
    }

    // ── Playback ───────────────────────────────────────────────────
    togglePlay() {
      this.playing ? this.pauseAll() : this.playAll();
    }

    playAll() {
      this.playing = true;
      this.playBtn.textContent = "Pause";
      const videos = this.allVideos();
      // Sync all to master time first, then play
      const t = this.masterTime();
      videos.forEach((v) => {
        if (Math.abs(v.currentTime - t) > 0.1) v.currentTime = t;
      });
      // Play all with a small stagger-proof approach
      Promise.all(videos.map((v) => v.play())).catch(() => {});
      this._raf = requestAnimationFrame(this._tick);
    }

    pauseAll() {
      this.playing = false;
      this.playBtn.textContent = "Play";
      this.allVideos().forEach((v) => v.pause());
      if (this._raf) { cancelAnimationFrame(this._raf); this._raf = null; }
    }

    resetAll() {
      this.pauseAll();
      this.allVideos().forEach((v) => { v.currentTime = 0; });
      this.timeline.value = 0;
      this.timeLbl.textContent = "0:00 / 0:00";
    }

    seekAll(t) {
      this.syncing = true;
      this.allVideos().forEach((v) => { v.currentTime = t; });
      this.syncing = false;
    }

    _updateTimeline() {
      const dur = this.duration();
      const cur = this.masterTime();
      if (dur) {
        this.timeline.value = (cur / dur) * 1000;
        this.timeLbl.textContent = `${fmt(cur)} / ${fmt(dur)}`;
      }
      // Check if ended
      const vids = this.allVideos();
      if (vids.length && vids.every((v) => v.ended)) {
        this.pauseAll();
      }
    }
  }

  // ── Bootstrap ──────────────────────────────────────────────────────
  function init() {
    const el = document.getElementById("video-compare-widget");
    if (el) new VideoCompareWidget(el);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
