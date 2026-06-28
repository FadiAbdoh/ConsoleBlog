// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
        userAgent: '*', // ينطبق على جميع محركات البحث (جوجل، بينج، إلخ)
        allow: '/',     // السماح بأرشفة جميع صفحات الموقع العامة (المقالات، السيرة الذاتية، إلخ)
        disallow: [
            '/dashboard/', // ⚠️ منع أرشفة لوحة التحكم لحماية خصوصيتها وأمنها
            '/api/',       // ⚠️ منع أرشفة روابط الـ APIs الداخلية
        ],
        },
        // رابط خريطة الموقع (Sitemap) الذي سننشئه لاحقاً لمساعدة جوجل في القراءة بسرعة
        sitemap: 'http://localhost:3000/sitemap.xml', 
    }
}