const div = dom.create('<div>newDiv</div>')
console.log(div)

dom.after(test, div)

const div3 = dom.create('<div id="parent"></div>')
dom.warp(test, div3)

dom.empty(empty)

dom.attr(test, 'title', 'iam Ricky')
const title1 = dom.attr(test, 'title')
console.log(`title1: ${title1}`)

dom.text(test, 'Hello, this is new content')
dom.style(test, 'border', '5px solid red')

dom.class.add(test, 'red')
dom.class.remove(test, 'red')
console.log(dom.class.has(test, 'red'))

dom.on(test, 'click', ()=>{
    console.log('点击了')
})

const testDiv = dom.find('#test')[0]
console.log(testDiv)

console.log(dom.parent(test))
console.log(dom.siblings(dom.find('#s2')[0]))

console.log(dom.next(s2))
console.log(dom.previous(s2))

const t = dom.find('#travel')[0]
dom.each(dom.children(t),(n)=> dom.style(n, 'color', 'red'))

console.log(dom.index(s2))
