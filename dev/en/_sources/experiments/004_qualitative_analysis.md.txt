# Qualitative Analysis for Effort vs Quality

A critical production decision that many of us face is the trade-off between effort and quality.
How much time should I spend on creating profiles to achieve the desired animation quality? At what point should I stop creating profiles and start manually tweaking my animation in Maya?
In the previous page [Pipeline Comparison++ (Quantitative)](003_pipeline_comparison_quantitative.md), we observed a saturation effect at around 100 profiles. Beyond that, animation quality does not improve significantly. This matches our observations in real production settings.
In this page, we explore this trade-off in a more visual manner.

In a typical production setting, filming and profile creation go hand in hand, and footage of the same actor playing the same character is added and processed over time.
This means early in production we are working with a smaller number of profiles, and this number grows over the course of filming.
This directly impacts how much time is required to achieve the desired level of animation quality.
At the beginning of the cycle with fewer profiles, the output animation tends to be less stable; thus, more profiles (effort) should be added from the video to achieve a similar quality level. As profiles accumulate over time (late production cycle), it is common to add one or even no profile from a video to generate animation.


We process the same video using different numbers of profiles and visualize the animation quality and the effort (number of profiles) required to achieve it.


Profiles are separated into three groups:
- ROM profiles: profiles from the Range-of-Motion video (50 profiles)
- Same-Video profiles: profiles created by selecting frames from the video. This represents how much effort and time you need to spend on creating profiles from within the video.
- Other-Video profiles: profiles created by selecting frames from other videos. This represents different stages of production.



Use the widget below to compare animation results side by side. Each slot lets you choose a different profile configuration using the two sliders:
- **Production Cycle** — how many profiles from *other* videos are available (simulates early vs. late production)
- **Effort per Video** — how many profiles you create from the *same* video (simulates time investment per shot)

Add up to 3 slots and play them synchronized to visually compare quality differences.

```{raw} html
<link rel="stylesheet" href="../_static/video_compare.css">
<div id="video-compare-widget"></div>
<script src="../_static/video_compare.js"></script>
```
