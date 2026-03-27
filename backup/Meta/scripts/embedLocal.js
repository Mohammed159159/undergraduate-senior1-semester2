const embedLocal = async (tp) => {
  const name = await tp.system.prompt("Enter name")

  await tp.file.rename(name);
  
  let frontmatter = `---
tags:
- resources/articles
annotation-target: ${name}.pdf
---
`
  let body = `![[${name}.pdf]]`

  return `${frontmatter}\n\n${body}`
}

module.exports = embedLocal