# Pipeline Comparison
This page shows the results of processing by different pipelines.


### TL;DR
1. Do you value reducing your workload more than improving quality? \
    - **Yes** : We recommend **"Robust"** to you
    - **No** :  Go to next question.
2. Can you add enough profiles from each video?
    - **Yes** : We recommend **"Rich"** to you
    - **No** :  We recommend **"RP"** to you



### Background
We provide several processing pipeline to track the facial expression.

1. Rich
 
    This tracks subtle movement better when provided with large amount of profile but less robust to occlusions and rotations. It is more suitable for Head Mount Camera (HMC) and Studio-use.

2. Robust
    
    This is more adoptive to head rotation but less accurate. It is designed to work better when the number of profiles is small (<20). It can be used with either a head-mounted or fixed camera. Additionally, quality degradation is small even when actors changes.

3. RP

    This aims to reduce the amount of profile required per video.

By choosing the pipeline that best suits your situation, you can more easily achieve your goals of reducing your workload and improving quality.

<!-- If our tracking is not working as well as it does, even though a large number of profiles are retargeted, changing the processing pipeline may improve the tracking results. This measure is effective for videos captured in a different environment than the profiles, and for videos of the long period capture that HMC is repeatedly attached and detached. \
(Still the most effective way to improve the animation quality of a particular video is to add more profiles from within the video itself.) -->


### Scenario Detail
We show the results of processing by different pipelines on 4 scenarios.

1. Only ROM 50 \
    Process videos using only the 50 ROM profiles picked up from ROM video. 
2. ROM 50 + Video Profile 10 \
    Process videos using the 50 ROM profiles and the 10 profiles picked up from within the video.
3. Only Video Profile 10 \
    Process videos using only the 10 profiles picked up from within the video.
4. Another Actor \
    Process videos of another actor using only the 50 ROM profiles.

If you add a number of profiles from within the video, "Rich" will produce ideal animation results. However, when there are not enough profiles, "Rich" tends to produce less-than-ideal animation results. In this case, "Robust" and "RP" will produce better results. 

Additionally, when processing the videos of another actor, you can make the animation result less likely to break down by selecting "Robust".

<!-- In this show case, we selected and rigged 50 profiles from the ROM video. Then, using only the 50 ROM profiles, we generate the results in Baseline. The occluded region tends to produce less-than-ideal animation results. \
This can be mitigated by adding profiles from within the video. We showcase how the performance improves when you add a number of profiles. We can see that the quality of the animation tends to improve. \
Additionally, we showcase the results of processing these videos using only the profiles from within them (i.e., no ROM profiles). -->

### Gallery
<details>
  <summary >Only ROM 50</summary>

  | Performance Video | Rich | Robust | RP |
| --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/RP/down_normal_t01.mp4" type="video/mp4"></video> | 
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/RP/Video_45_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/baseline/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |

</details>

<details>
  <summary >ROM 50 + Video Profile 10</summary>

  | Performance Video | Rich | Robust | RP |
| --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/RP/down_normal_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/RP/Video_45_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/p_10/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |

</details>

<details>
  <summary >Only Video Profile 10</summary>

  | Performace Video | Rich | Robust | RP |
| --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/RP/down_normal_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/RP/Video_45_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/v_10/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |

</details>

<details>
  <summary >Another Actor</summary>

  | Performance Video | Rich | Robust | RP |
| --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/other_actor_set/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/Rich/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/Robust/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/RP/01_joy_sample.mp4" type="video/mp4"></video> |        
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/other_actor_set/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/Rich/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/Robust/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/other_actor/RP/02_sadness_sample.mp4" type="video/mp4"></video> |

</details>


