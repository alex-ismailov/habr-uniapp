const autoprefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker'); // группирует все media запросы в складыает их рядом в app.css
const cssnano = require('cssnano'); // минификация

module.exports = {
  plugins: [
    autoprefixer,
    cssMqpacker,
    cssnano({
      preset: [
        'default', {
          discardComments: {
            removeAll: true,
          },
        },
      ],
    }),
  ],
};
