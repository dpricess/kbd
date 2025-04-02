# kbd

Organize Your Files
Let’s use the modular structure from earlier, adapted for Webpack. Here’s the setup:
Directory:

learn-app/
├── index.html         # Entry HTML
├── app.js             # Main app logic (Webpack entry point)
├── components/        # UI components
│   ├── Slide.js
│   ├── Review.js
│   ├── Notes.js
│   └── TopicSelect.js
├── lib/               # Utilities
│   ├── db.js
│   ├── state.js
│   └── utils.js
├── styles/
│   └── styles.css
├── package.json       # npm config
├── webpack.config.js  # Webpack config (to be created)
└── dist/              # Output folder (created by Webpack)
    └── bundle.js      # Bundled JS (created later)

Action: 
Create these folders and files manually (e.g., mkdir components lib styles).

Move styles.css to styles/.

Split your learn.html script into the files below (I’ll provide minimal versions; expand with your full logic).


Build with Webpack
Action: 
Run:
bash

npx webpack


