# 以前のバージョン（25.07）との比較
FCS 25.10では、プラスのパイプライン（RP+, Robust+）の追加に加えて、既存のパイプライン（Rich、RP）の強化も行いました。
具体的には、トラッキング情報を取捨選択する際に、より適切な情報が使用されるように調整しました。
そのため、ランドマークの出力が同じであっても、より高品質なアニメーションを生成できるようになりました。
このページではこちらが用意したいくつかの検証結果をこちらで公開いたします。
ご自身のデータで確認したい場合、25.07含め、以前のバージョンのセッションをエクスポートし、バックアップしてから、25.10でセッションを開き、処理し直せば強化されたパイプラインの結果を確認できると思います。

### Gallery
こちらのギャラリーではツークンで評価で使っている動画の一部を、他の条件を維持したまま、パイプラインのバージョンのみを変更した比較動画になります。
左から順にアクターの動画、25.07で出力した動画、25.10で出力した動画となっています。

<details>
  <summary >Baseline Only</summary>

| Rich | RP |
| --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/Rich/down_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/RP/down_normal_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/Rich/Video_45_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/RP/Video_45_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/Rich/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/baseline/RP/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Baseline + Video Profile 10</summary>

| Rich | RP |
| --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/Rich/down_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/RP/down_normal_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/Rich/Video_45_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/RP/Video_45_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/Rich/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/rom_plus_10/RP/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Video Profile 10 Only</summary>

| Rich | RP |
| --------- | --------- |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/Rich/down_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/RP/down_normal_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/Rich/Video_45_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/RP/Video_45_t01_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/Rich/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/only_video_10/RP/Video_facepaint_normal_t01_combined.mp4" type="video/mp4"></video> |

</details>
<br>
<details>
  <summary >Another Actor</summary>

| Rich | RP |                                                        
| --------- | --------- |     
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/another_actor/Rich/01_joy_sample_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/another_actor/RP/01_joy_sample_combined.mp4" type="video/mp4"></video> |
| <video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/another_actor/Rich/02_sadness_sample_combined.mp4" type="video/mp4"></video> |<video height="300" controls><source src="https://github.com/ZukunFCS/artifacts/raw/refs/heads/master/benchmarks/pipeline_comparison/25.10vs25.07/another_actor/RP/02_sadness_sample_combined.mp4" type="video/mp4"></video> |

</details>
