export default function sitemap(){
    return[
        {
            url:process.env.NEXT_PUBLIC_BASE_URL,
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'product',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'category',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'profile',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'login',
            lastModified:new Date()
        },
        {
            url:process.env.NEXT_PUBLIC_BASE_URL+'register',
            lastModified:new Date()
        }
    ]
}