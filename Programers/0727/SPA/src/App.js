import HomePage from './pages/HomePage.js'
import ProductPage from './pages/ProductPage.js'

export default function App({ $target }) {
   const homePage = new HomePage({ $target })
   const productPage = new ProductPage({ $target, initialState: {} })

   this.route = () => {
      // 여기서 pathname에 따라 Page 컴포넌트 렌더링 처리
      const { pathname } = location

      $target.innerHTML = ''

      if (pathname === '/') {
         // HomePage 그리기
         homePage.render()
      } else if (pathname.indexOf('/products/') > -1) {
         // ProductPage 그리기
         // url에서 productID 뽑기
         // 1번 방법 const productID = pathname.split(`/products/`)
         // /products/1
         // ▲ 위 방법으로
         const [,, productID] = pathname.split('/')
         productPage.setState({
            productID
         })
      } else {
         // 404 처리
         $target.innerHTML = '<h1>404 Not Found</h1>'
      }

   }

   this.init = () => {
      this.route()
   }

   window.addEventListener('click', e => {
      if (e.target.className === 'link') {
         e.preventDefault()
         const { href } = e.target
         history.pushState(null, null, href.replace(location.origin, ''))
         this.route()
      }
   })

   window.addEventListener('popstate', () => this.route())

   this.init()
}
