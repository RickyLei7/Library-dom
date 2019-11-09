window.dom = {
    create(string) {
        const container = document.createElement('template')
        //加template是因为比如div里面不能直接加td，违反html语法
        container.innerHTML = string.trim() // 去掉空格
        return container.content.firstChild  //因为通过template不能直接通过container.children来获取，要通过content.firstChild
    },
    //在  #test 后面加一个node
    after(node, node2) {
        //找到node的爸爸，然后调用insertBefore的方法，然后把node2插到node的下一个节点的前面v
        node.parentNode.insertBefore(node2, node.nextSibling)
    },
    before(node, node2) {
        node.parentNode.insertBefore(node2, node)
    },
    append(parent, node) {
        parent.appendChild(node)
    },
    warp(node, parent) {
        dom.before(node, parent)
        dom.append(parent, node)
    },
    remove(node) {
        //删除一个node,找到爸爸，让爸爸删掉儿子
        node.parentNode.removeChild(node)
        return node
    },
    empty(node) {
        const {childNodes} = node
        const array = []
        let x = node.firstChild
        while (x) {
            array.push(dom.remove(node.firstChild))
            x = node.firstChild //因为第一个儿子已经被移除，所以现在第二个儿子变成第一个儿子
        }
        return array
    },
    attr(node, name, value) {   //重载
        if (arguments.length === 3) {
            node.setAttribute(name, value)
        } else if (arguments.length === 2) {
            return node.getAttribute(name)
        }

    },
    text(node, string) {   // 这个方法叫适配
        if (arguments.length === 2) {
            if ('innerText' in node) {
                node.innerText = string //ie
            } else {
                node.textContent = string // chrome
            }
        } else if (arguments.length === 1) {
            if ('innerText' in node) {
                return node.innerText
            } else {
                return node.textContent
            }
        }
    },
    html(node, string) {
        if (arguments.length === 2) {
            node.innerHTML = string
        } else {
            return node.innerHTML
        }
    },
    style(node, name, value) {
        if (arguments.length === 3) {
            //比如会想写dom.style(div, 'color', 'red')
            node.style[name] = value
        } else if (arguments.length === 2) {
            if (typeof name === 'string')
            // 可能会是想获取 dom.style(div, 'color')
                return node.style[name]
        } else if (name instanceof Object) {
            // dom.style(div, {color: 'red']
            const object = name
            for (let key in object) {
                //key: border / color
                // node.style.color = ....
                // node.style.color = ....
                node.style[key] = object[key]
                // 如果是.style.key的话，key是一个字符串，[key]是一个字符串
            }
        }
    },
    class: {
        add(node, className) {
            node.classList.add(className)
        },
        remove(node, className) {
            node.classList.remove(className)
        },
        has(node, className) {
            return node.classList.contains(className)
        }
    },
    on(node, eventName, fn) {
        node.addEventListener(eventName, fn)
    },
    off(node, eventName, fn) {
        node.removeEventListener(eventName, fn)
    },
    find(selector, scope) {
        return (scope || document).querySelectorAll(selector)
        //如果有scope，那就是scope.quer...没有scope,那就是document.....
        //高手写法
    },
    parent(node) {
        return node.parentNode
    },
    children(node) {
        return node.children
    },
    siblings(node) {
        return Array.from(node.parentNode.children).filter(n => n !== node)
    },
    next(node) {
        let x = node.nextSibling
        while (x && x.nodeType === 3) {//1是node, 3是text 的意思
            x = x.nextSibling
        }
        return x
    },
    previous(node) {
        let x = node.previousSibling
        while (x && x.nodeType === 3) {//1是node, 3是text 的意思
            x = x.previousSibling
        }
        return x
    },
    each(nodeList, fn) {
        for (let i = 0; i < nodeList.length; i++) {
            fn.call(null, nodeList[i])
        }
    },
    index(node) {
        const list = dom.children(node.parentNode)
        let i
        for (i = 0; i < list.length; i++) {
            if (list[i] === node) {
                break
            }
        }
        return i
    }

}

