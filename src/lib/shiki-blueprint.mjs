// §5.4: code blocks on --bp-deep, Shiki theme tuned to the Blueprint palette.
// Every foreground below is ≥ 6.9:1 against #0F2560.
export default {
  name: 'blueprint',
  type: 'dark',
  colors: {
    'editor.background': '#0F2560',
    'editor.foreground': '#F2F5FF',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#9FB2E8', fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'keyword.control', 'storage', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#FFD23F' },
    },
    { scope: ['string', 'string.quoted', 'string.template'], settings: { foreground: '#8FE3FF' } },
    {
      scope: ['constant.numeric', 'constant.language', 'constant.character'],
      settings: { foreground: '#FFD23F' },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call'],
      settings: { foreground: '#F2F5FF', fontStyle: 'bold' },
    },
    {
      scope: ['entity.name.type', 'entity.name.class', 'support.type', 'support.class'],
      settings: { foreground: '#C9D4F5' },
    },
    {
      scope: ['variable', 'variable.parameter', 'meta.definition.variable'],
      settings: { foreground: '#F2F5FF' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: '#C9D4F5' },
    },
  ],
};
