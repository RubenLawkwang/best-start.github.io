/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"vpNr3nkfDBk9xDhC","label":"University","bookmarks":[{"id":"yw8omvcL87RSEUlY","label":"Email","url":"mail.google.com"},{"id":"XVKANs3DOAQhlufb","label":"Classroom","url":"https://classroom.google.com/"}]},{"id":"CGi3mFYAWcqM1OmZ","label":"design tools","bookmarks":[{"id":"o1Agewh7B5qchW9i","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"Xe4ugOkDgVJBZ2yI","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"0r6IImkP6TsmErcV","label":"haikei","url":"https://app.haikei.app/"},{"id":"0zVIjKxT6iDp1MiW","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"202QSG3t3GUJL6sS","label":"worth reading","bookmarks":[{"id":"O0ZyJk1dMtzIAA0n","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"UobywiIiAT1GLzPw","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"H88jebzOixwzBHcl","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
