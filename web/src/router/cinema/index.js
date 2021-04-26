export default{
    path : '/cinema',
    component : ()=> import('@/views/Cinema'),
    children:[
      {
        path:'CiList',
        component :() => import('@/components/CiList'),
      },
      {
        path:'/cinema',
        redirect : '/cinema/CiList'
      },
    ]
}