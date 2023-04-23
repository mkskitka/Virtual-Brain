## Adding a New Project 

 Navigate to in Config/constants.js
#### 1. Add New Project Object to projects 
Example: 

      {\
        id: "AP",\
        title: "Astropunk",\
        description: "Generative Music Video Game",\
        writeup: astropunk_bio,\
        tags: ["A_V", "HCI", "AI"]\
      },


#### 2. Add any video configurations to VIDEO_CONFIG

Key must match that in the projects object (step 1)\
Add content to src_path 
\
Example:

    "AP": [{\
        ...video_content_template,\
        src_path: './videos/AstropunkReel.mov',\
        title: "",\
    }],

#### 3. Add any window configs 

\
Example:

    "AP": \
        [picture_window_template, 
            {...video_window_template, 
            style:{...video_window_template.style, top: '5%', left: '40%'}}],

#### Add window Content
There should be one value in area for each window config (step 3)
Values much match by index 

\
Example:

    "AP": [
        <div style={{...picture_content_template,
            'backgroundImage':"url(/astropunk-mockup.png)"}} id={"AP+2"}/>,
        <Video config={VIDEO_CONFIGS["AP"][0]} id={"AP+1"}/>
        ],