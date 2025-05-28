# Preliminary
This section documents some of the high level concepts and assumptions that we made when during the development of this piece of software. 

## General Workflow
FCS semi-automatically creates facial animation from footage for any rig by allowing the user to provide pairwise reference of facial expression of the actor and the character in the form of [Profiles](#Profiles). 




## Profiles
Profile refers to a paired data of a single image of an actor, and the corresponding character, rigged to express the same facial expression as the actor in the image. This is created using FCS by selecting particular frame from a video, and rigging the character in Maya. 

[Learn about how to create profiles in FCS...](https://zukunfcs.github.io/fcs-doc/latest/en/008_profile.html)

## ROM
As a general rule of thumb, we recommend filming a Range of Motion (ROM) video prior to the actual filming. A ROM video should cover a wide range of facial expression that the actor can do. It is not strictly necessary but we find that using a ROM video in production often leads to time saving, especially when the amount of footage that has to be processed is large. The time saving would be less significant if you are processing only a small amount of footage. 

With your purchase of FCS comes with a PDF containing approximately 50 facial expressions that you can use for the ROM video, but you can always use your own. Inside FCS you can import the ROM video and create the 50 profiles correspondingly. 

