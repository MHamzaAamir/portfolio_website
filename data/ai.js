const ai = [
    {
        name: "Face Detection Model",
        description: "Developed a real-time face detection system in Tensorflow and Python. I started by creating a custom dataset, manually annotating face images, and preprocessing them for training. Used a VGG16 backbone for feature extraction, followed by trainable Dense layers to predict the presence of a face and its bounding box coordinates",
        link: ""
    },
    {
        name: "Adaptive Web Interaction",
        description: `Developed a browser-compatible web extension that enables users to automate tasks through natural language prompts. On the backend, an LLM 
                (Gemini) processes both the user’s input and a compressed representation of the website's structure to generate executable actions. For example, a 
                prompt like “Go to Google Meet and start an instant meeting” triggers the extension to autonomously perform the required steps. The agent continues 
                execution until the task is successfully completed.`,
        link: ""
    },
    {
        name: "Fashion GANs",
        description: "Generative Adversarial Networks (GANS) implemented using Python and Tensorflow. The idea was to generate new images of clothes by first feeding in images from the Fashion MNIST dataset.",
        link: ""
    }
]

export default ai