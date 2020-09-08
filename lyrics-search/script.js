const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiUrl = `https://api.lyrics.ovh`;

async function searchSongs(term) {
  // fetch(`${apiUrl}/suggest/${term}`).then(response => response.json())
  // .then(data => console.log(data));

  // AWAIT async is the same as the following above code, much more cleaner
  const response = await fetch(`${apiUrl}/suggest/${term}`);
  const data = await response.json();

  console.log(data);

  showData(data);
}

// show songs in the DOM 

function showData(data) {
  // let output ='';

  // data.data.forEach(song => {
  //   output += `
  //   <li>
  //     <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //     <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
  //   </li>
  //   `;

  // });

  // result.innerHTML = `
  //   <ul class="songs">
  //     ${output}
  //   </ul>
  // `

  result.innerHTML = `
    <ul class="songs">
      ${data.data.map(song => `<li>
      <span><strong>${song.artist.name}</strong> - ${song.title}</span>
      <button class="btn" data-artist="${song.artist.name}" data-songtitle="${song.title}">Get Lyrics</button>
    </li>`)
    .join('')}
    </ul>
  `

  if(data.prev || data.next) {
    more.innerHTML = `
      ${data.prev ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>` : ''}
      ${data.next ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>` : ''}
    `
  } else {
    more.innerHTML = '';
  }
}

// get prev and next songs

async function getMoreSongs(url) {
  const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`)
  const data = await response.json();
  console.log(data);

  showData(data);
}

// event listeners

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchResult = search.value.trim();

  if(!searchResult) {
    alert('please type a song')
  } else {
    searchSongs(searchResult);
  }
});

// get lyrics for song 

async function getLyrics(artist, songTitle) {
  const response = await fetch(`${apiUrl}/v1/${artist}/${songTitle}`)
  const data = await response.json();

  
  const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');;
  console.log(lyrics)
  
  result.innerHTML = `<h2><strong>${artist}</strong> - ${songTitle}</h2>
  <span>${lyrics}</span>`;

  more.innerHtml = '';
}

// get lyrics button click

result.addEventListener('click', e => {
  const clickedEl = e.target;

  if(clickedEl.tagName === 'BUTTON') {
    const artist = clickedEl.getAttribute('data-artist');
    const songTitle = clickedEl.getAttribute('data-songtitle');


    getLyrics(artist, songTitle);
  }

})
