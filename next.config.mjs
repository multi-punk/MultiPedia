import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  contentDirBasePath: '/',
  search: {
    codeblocks: false
  },

})

export default withNextra({
  reactStrictMode: true
})
