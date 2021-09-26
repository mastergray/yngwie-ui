const path = require('path');

// Configures webpack for creating PROD build of yngwie.js:
module.exports = {
  mode:"production",
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'yngwie-ui.js',
    library:{
      name:"YngwieUI",
      type:"umd"
    }
  }
};
