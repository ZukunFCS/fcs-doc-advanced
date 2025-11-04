# Pipeline Comparison
FCS comes packaged with multiple algorithms (**pipelines**) for processing footages. 

Each of the pipelines are designed with different usage scenarios in mind. Here is a flowchat to help you determine which you should use. 

## Table of Contents

1. [Just tell me which pipeline I should use](#just-tell-me-which-pipeline-i-should-use)
2. [Pipeline](#pipeline)
3. [Experiment Scenarios](#experiment-scenarios)
4. [Gallery](#gallery)
5. [Conclusion](#conclusion)
### Just tell me which pipeline I should use.
![](../assets/benchmark_pipeline.svg)

<!-- https://docs.google.com/presentation/d/1G5nimISmlF6UtnMI47KA63R9ldipeWlUf_yNKQ12EC4/edit?usp=sharing -->

### Pipeline
For those who want more information about the pipelines:
We currently offer three pipelines officially, _Rich_, _Robust_ and _RP_. _Rich_ is the default pipeline up until FCS 25.04, and starting with FCS 25.07 the default is _RP_. 
Additionally, we offer two experimental pipelines, _RP+_ and _Robust+_, starting with FCS 25.10.　

1. _Rich_

    This pipeline tends to be able to reproduce subtle movement in the character better when provided with large amount of profile (>100) and is generally your best pick for your effort if you work on a large scale projects (full length movies, game) and requires high quality animation. 

3. _RP_

    The RP pipeline functions as a less-effort-intensive alternative of Rich, by making it more robust to camera shift; thus, reducing the amount of profiles required. In exchange it tends to capture less subtle facial movement. 

2. _Robust_
    
    This is significant more adoptive to head rotation but less accurate. It is designed to work better when the number of profiles is extremely small (<10). Additionally, **while unsupported officially**, this pipeline would function better than the other two if the actor changes (the session contains footage of multiple actors).

3. _RP+_ and _Robust+_
   
    Based on the same pipeline as RP and Robust, RP+ and Robust+ uses a new facial landmark tracker made internally. These new pipelines are experimental and are subject to change.


By choosing the pipeline that best suits your situation, you can more easily achieve your goals of reducing your workload and improving quality.

Note that there you can change the pipeline anytime during the project. You will only have to check the **reprocess** box when processing the video, feel free to try the pipelines and see what works the best for you. 


<!-- If our tracking is not working as well as it does, even though a large number of profiles are retargeted, changing the processing pipeline may improve the tracking results. This measure is effective for videos captured in a different environment than the profiles, and for videos of the long period capture that HMC is repeatedly attached and detached. \
(Still the most effective way to improve the animation quality of a particular video is to add more profiles from within the video itself.) -->


### Experiment scenarios
To demonstrate the strength of different pipelines, we prepare 4 scenarios that reassemble potential ways to create profiles using FCS. 


1. Baseline Only \
    Process videos using only the 50 baseline ROM profiles. \
    This scenario recreates the standard procedure of creating facial animation with minimal effort. 

2. Baseline + Video Profile 10 \
    Process videos using the 50 ROM profiles and the 10 profiles picked up from within the video.  \
    This scenario shows how the animation quality tends to improve by adding more profiles from the video. 

3. Video Profile 10 Only \
    Process videos using only the 10 profiles picked up from within the video. \
    This scenario shows the performance of the pipelines if you skip creating the baseline ROM profiles. 

4. Another Actor \
    Process videos of another actor using only the 50 ROM profiles. \
    This scenario simulate when the person that you created the profiles for is a different one than the one that you would like to process videos of (due to actor change etc.). This is **not** a supported use-case but we still provide a reference in case you are curious. 



### Gallery
<details>
  <summary >Baseline Only</summary>

<!--
| Performance Video | Rich | Robust | RP | RPP | RobustP |
| --------- | --------- | --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RPP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RobustP/down_normal_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RPP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RobustP/Video_45_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RPP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/RobustP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |
-->

| 5 Pipeline Comparison Video |
| --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Merged_videos/ITA_Corpus_No04_Normal_Nagaki_t01__ROM_50_Video_00_LQ.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/baseline/Merged_videos/HMC_Side_Nagaki_t01__ROM_50_Video_00_LQ.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Baseline + Video Profile 10</summary>

<!--
| Performance Video | Rich | Robust | RP | RPP | RobustP |
| --------- | --------- | --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RPP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RobustP/down_normal_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RPP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RobustP/Video_45_t01.mp4" type="video/mp4"></video> |  
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RPP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/RobustP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |
-->

| 5 Pipeline Comparison Video |
| --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Merged_videos/ITA_Corpus_No04_Normal_Nagaki_t01__ROM_50_Video_10_LQ.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/rom_plus_10/Merged_videos/HMC_Side_Nagaki_t01__ROM_50_Video_10_LQ.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Video Profile 10 Only</summary>

<!--
| Performace Video | Rich | Robust | RP | RPP | RobustP |
| --------- | --------- | --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Rich/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Robust/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RPP/down_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RobustP/down_normal_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Rich/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Robust/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RPP/Video_45_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RobustP/Video_45_t01.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/pipeline_comparison_set/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Rich/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Robust/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RPP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/RobustP/Video_facepaint_normal_t01.mp4" type="video/mp4"></video> |
-->

| 5 Pipeline Comparison Video |
| --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Merged_videos/ITA_Corpus_No04_Normal_Nagaki_t01__ROM_00_Video_10_LQ.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/only_video_10/Merged_videos/HMC_Side_Nagaki_t01__ROM_00_Video_10_LQ.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Another Actor</summary>

| Performance Video | Rich | Robust | RP | RPP | RobustP |
| --------- | --------- | --------- | --------- | --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/other_actor_set/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/Rich/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/Robust/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RP/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RPP/01_joy_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RobustP/01_joy_sample.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/common/other_actor_set/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/Rich/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/Robust/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RP/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RPP/02_sadness_sample.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10/another_actor/RobustP/02_sadness_sample.mp4" type="video/mp4"></video> |

</details>


### Conclusion
If you can afford to create a number of profiles from within the video that you are trying to process, or create a large amount of profiles across many videos (i.e., multiple days of filming), _Rich_ tends to produce the best animation results amoung the three pipelines.  

However, if you are unable (due to time constraint or otherwise) to create profiles from within the video that you want to process, _Robust_ and _RP_ will produce better results. 

When there are a small number of profiles (>10), _Robust_ is often the best option. As the number of profiles increases, _Rich_ and _RP_ become more effective. 

Also, when processing the videos of another actor, you can make the animation result less likely to break down by selecting _Robust_.
