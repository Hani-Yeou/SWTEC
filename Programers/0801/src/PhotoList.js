/*
   initialState: [
      {
         id: 1,
         imagePath: ''
      }
   ]
*/

export default function PhotoList({ $target, initialState, onScrollEnded }) {
   let isInitialize = false

   const $photoList = document.createElement('div')
   $target.appendChild($photoList)
   this.state = initialState

   this.setState = nextState => {
      this.state = nextState
      this.render()
   }

   this.render = () => {
      if (!isInitialize) {
         $photoList.innerHTML = `
            <ul class="PhotoList_photos"></ul>
            <button class="PhotoList_loadMore" style="width:100%; heigh: 200%; font-size: 20px">Load More</button>
         `
         isInitialize = true
      }

      const $photos = $photoList.querySelector('.PhotoList_photos')

      this.state.forEach(photo => {
         // photo의 id 기준으로 렌더링이 되어있는지 체크
         if ($photos.querySelector(`li[data-id="${photo.id}"]`) === null) {
            // 없으면 li 생성하고 $photo에 appendChild
            const $li = document.createElement('li')
            $li.setAttribute('data-id', photo.id)
            $li.style = 'list-style: none;'
            $li.innerHTML = `<img width="100%" src="${photo.imagePath}" />`

            $photos.appendChild($li)
         }
      })
   }
   this.render()

   $photoList.addEventListener('click', e => {
      if (e.target.className === 'PhotoList_loadMore') {
         onScrollEnded()
      } 
   })
}