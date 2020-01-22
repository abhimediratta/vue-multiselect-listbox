const meta = {
  title: 'Vue Multi-Select Dual Listbox Component',
  description: 'Multi-select widget where users can select options from a list in the left side to a list on the right',
  url: ''
};

let head = [
  ['meta', {name: 'title', content: meta.title}],
  ['meta', {name: 'description', content: meta.description}],
  ['meta', {property: 'og:url', content: meta.url}],
  ['meta', {property: 'og:title', content: meta.title}],
  ['meta', {property: 'og:site_name', content: meta.title}]
];

module.exports = {
  title: 'Vue Multi-Select Dual Listbox',
  description: meta.description,
  base: '/vue-multiselect-listbox/',
  head,
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-156490644-1'
      }
    ],
    '@vuepress/register-components'
  ],
  themeConfig: {
    repo: 'abhimediratta/vue-multiselect-listbox',
    docsDir: 'docs',
    sidebar: {
      '/': [
        {
          title: 'Getting Started',
          collapsable: false,
          children: [
            ['guide/install', 'Installation'],
            ['guide/options', 'Options'],
            ['guide/values', 'Selecting Values'],
          ],
        },
        {
          title: 'Styling',
          collapsable: false,
          children: [
            ['guide/css', 'CSS'],
          ],
        }
      ],
    }
  },
};