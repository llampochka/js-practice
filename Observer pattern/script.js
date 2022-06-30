class EventObserver {
    constructor() {
        this.observers = []
    }

    subscribe(fn) {
        this.observers.push(fn)
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(subscriber => subscriber !== fn)
    }

    broadcast(data) {
        this.observers.forEach(subscriber => subscriber(data))
    }
}

const observer = new EventObserver();



// observer.broadcast({ someData: 'hello' })

const textField = document.getElementById('textField');
const btn = document.getElementById('btn');
const countField = document.getElementById('countField');

btn.addEventListener('click', () => {
    console.log('btn clicked');
});

textField.addEventListener('keyup', () => {
    observer.broadcast(textField.value)
})

observer.subscribe(text => {
    const getWordsCount = (text) => {
        return text ? text.trim().split(/\s+/).length : 0
    }
    countField.innerHTML = getWordsCount(text)
});

observer.subscribe(data => {
    console.log('subscribe for module 2 fired', data)
});