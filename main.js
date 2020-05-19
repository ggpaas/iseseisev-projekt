class Entry {
    constructor(title, author, zanr) {
        this.title = title;
        this.author = author;
        this.zanr = zanr;
    }
}

class Book{
    constructor(){
        this.entries = JSON.parse(window.localStorage.getItem('entries')) || [];

        document.querySelector('#addButton').addEventListener('click', ()=>{this.addEntry()});
        this.render();
    }

    addEntry(){
        const titleValue = document.querySelector('#title').value;
        const authorValue = document.querySelector('#author').value;
        const zanrValue = document.querySelector('#zanr').value;

        console.log(titleValue, authorValue, zanrValue);

        this.entries.push(new Entry(titleValue, authorValue, zanrValue));

        console.log(this.entries);
        this.saveLocal();

        this.render();
    }

    render(){
        if(document.querySelector('.book-list')){
            document.body.removeChild(document.querySelector('.book-list'));
        }

        const ul = document.createElement('ul');
        ul.className = 'book-list';
        this.entries.forEach((entryValue, entryIndex)=>{
            const li = document.createElement('li');
            const div = document.createElement('div');
            const removeButton = document.createElement('div');
            removeButton.classList.add('delete-button');
            const removeIcon = document.createTextNode('X');
            li.classList.add('entry');
            removeButton.addEventListener('click', ()=>{
                ul.removeChild(li);
                this.entries.splice(entryIndex, 1);
                this.saveLocal();
                this.render();
            });



            div.innerHTML = `${entryValue.title} <br> ${entryValue.author} <br> ${entryValue.zanr}`;

            removeButton.appendChild(removeIcon);
            li.appendChild(div);
            li.appendChild(removeButton);
            ul.appendChild(li);
        });

        document.body.appendChild(ul);
    }

    saveLocal(){
        window.localStorage.setItem('entries', JSON.stringify(this.entries));
        console.log('save');
    }

}

const book = new Book();