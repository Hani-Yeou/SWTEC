import PostsPage from "./PostsPage.js"
import PostEditPage from "./PostEditPage.js"

// url 규칙
// 루트 : postsPage 그리기

// "/posts/{id}" - id에 해당하는 post 생성
// "/posts/new" - 새 post 생성

export default function App({ $target }) {
   const postsPage = new PostsPage({
      $target
   })

   const postEditPage = new PostEditPage({
      $target, 
      initialState: {
         postID: 'new',
         post: {
            title: '',
            content: ''
         }
      }
   })

   this.route = () => {
      $target.innerHTML = ''
      const { pathname } = window.location

      if (pathname === '/') {
         postsPage.render()
      } else if (pathname.indexOf('/posts/') === 0) {
         const [, , postID] = pathname.split('/')
         postEditPage.setState({ postID })
      }
   }

   this.route()

   window.addEventListener('route-change', (e) => {
      console.log(e)
      
      //history.pushState(null, null, nextUrl)
      //this.route()
   })
} 