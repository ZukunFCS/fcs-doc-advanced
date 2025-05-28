# Preliminary
This self-contained section explains some of the high level concepts and assumptions of FCS. We reference these concepts later on this site. 

## General Workflow
Following similar software, FCS semi-automatically creates facial animation from footage for any rig by allowing the user to provide pairwise reference of facial expression of the actor and the character in the form of [Profiles](#profiles). 

After creating enough profiles, FCS automatically establishes a relationship between the facial expression of the actor and that of the character. This is often an iterative process that rely on the user to provide more and more profiles to increase the accuracy of the prediction. 

In general, accuracy of the animation would tend to worsen when drastic movement is involved, camera blur etc. In this case we recommend adding frames that failed to produce the desired result as profile, manually correct the rig parameters and reprocess. 


## Profiles
Profile refers to a paired data of a single image of an actor, and the corresponding character, rigged to express the same facial expression as the actor in the image. This is created using FCS by selecting particular frame from a video, and rigging the character in Maya. 

[Learn about how to create profiles in FCS...](https://zukunfcs.github.io/fcs-doc/latest/en/008_profile.html)

## ROM
As a general rule of thumb, we recommend filming a Range of Motion (ROM) video prior to the actual filming. A ROM video should cover a wide range of facial expression that the actor can do. It is not strictly necessary but we find that using a ROM video in production often leads to time saving, especially when the amount of footage that has to be processed is large. The time saving would be less significant if you are processing only a small amount of footage. 


## Baseline profiles
With your purchase of FCS comes with a PDF containing approximately 50 facial expressions that you can use for the ROM video, it is meant for guidance but you can always use your own ROM facial expressions. 
We refer to profiles with the facial expression in the PDF the baseline profiles collectively, and often use them as a benchmarking baseline. 