# Qualitative Analysis for Effort vs Quality

A critical production decision that many of us face is the trade-off between effort and quality.   
How much time should I spend on creating profiles to achieve the desired animation quality? At what point should I stop creating profiles and start manually tweaking my animation in Maya?  
In the previous page [Pipeline Comparison++ (Quantitative)](003_pipeline_comparison_quantitative.md), we observe a saturation effect at around 100. Beyond that, the quality of the animation does not improve significantly. This matches our observation in real production settings. 
In this page, we will explore this trade-off in a more visual manner.
We process the same video using a different number of profiles, and visualize the animation quality and the effort (number of profiles) required to achieve it.

Profiles are seperated into three groups: 
- ROM profiles: profiles from the Range-of-Motion video (50 Profiles)
- Same-Video profiles: profiles created by selecting frames from the video, this represents how much effort/time you need to spend on creating profiles from within the video.
- Other-Video profiles: profiles created by selecting frames from other videos, this represents different stages of the production.




Use the widget below to compare animation results side by side. Each slot lets you choose a different profile configuration using the two sliders:
- **Production Cycle** — how many profiles from *other* videos are available (simulates early vs late production)
- **Effort per Video** — how many profiles you create from the *same* video (simulates time investment per shot)

Add up to 3 slots and play them synchronized to visually compare quality differences.

```{raw} html
<link rel="stylesheet" href="../_static/video_compare.css">
<div id="video-compare-widget"></div>
<script src="../_static/video_compare.js"></script>
```
