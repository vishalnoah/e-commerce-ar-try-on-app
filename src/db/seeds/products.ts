import { db } from '@/db';
import { products } from '@/db/schema';

async function seed() {
    const sampleProducts = [
        {
            name: "Classic Cotton T-Shirt",
            description: "Classic cotton crew neck t-shirt perfect for everyday wear. Soft breathable fabric ensures all-day comfort. Available in versatile colors to match any outfit.",
            price: "24.99",
            image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
            gender: "Men",
            category: "T-Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Nike",
            createdAt: new Date().toISOString()
        },
        {
            name: "Floral Summer Dress",
            description: "Elegant midi dress with floral print and flowing silhouette. Perfect for summer occasions, weddings, or evening outings. Lightweight fabric with adjustable waist tie.",
            price: "89.99",
            image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
            gender: "Women",
            category: "Dresses",
            sizes: "S,M,L,XL,XXL",
            brand: "Zara",
            createdAt: new Date().toISOString()
        },
        {
            name: "Slim Fit Dress Pants",
            description: "Tailored slim-fit dress pants crafted from premium stretch fabric. Professional look with modern comfort for office or formal events. Features flat front and side pockets.",
            price: "79.99",
            image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
            gender: "Men",
            category: "Pants",
            sizes: "S,M,L,XL,XXL",
            brand: "Calvin Klein",
            createdAt: new Date().toISOString()
        },
        {
            name: "Denim Jacket",
            description: "Classic denim jacket with vintage wash and comfortable fit. Timeless style that pairs perfectly with any casual outfit. Durable construction with button closure and chest pockets.",
            price: "109.99",
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
            gender: "Women",
            category: "Jackets",
            sizes: "S,M,L,XL,XXL",
            brand: "Levi's",
            createdAt: new Date().toISOString()
        },
        {
            name: "Performance Hoodie",
            description: "Athletic hoodie designed for active lifestyle with moisture-wicking technology. Soft fleece interior keeps you warm during workouts or casual wear. Features kangaroo pocket and adjustable drawstring hood.",
            price: "54.99",
            image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
            gender: "Men",
            category: "Hoodies",
            sizes: "S,M,L,XL,XXL",
            brand: "Adidas",
            createdAt: new Date().toISOString()
        },
        {
            name: "High-Waisted Skinny Jeans",
            description: "Flattering high-waisted jeans with skinny leg opening and stretch denim. Comfortable all-day wear with modern silhouette. Classic five-pocket styling in dark wash.",
            price: "69.99",
            image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80",
            gender: "Women",
            category: "Jeans",
            sizes: "S,M,L,XL,XXL",
            brand: "H&M",
            createdAt: new Date().toISOString()
        },
        {
            name: "Oxford Button-Down Shirt",
            description: "Crisp oxford shirt with classic button-down collar and tailored fit. Perfect for business casual or smart casual occasions. Made from breathable cotton blend fabric.",
            price: "49.99",
            image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
            gender: "Men",
            category: "Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Ralph Lauren",
            createdAt: new Date().toISOString()
        },
        {
            name: "Pleated Midi Skirt",
            description: "Elegant pleated skirt with flowy movement and versatile styling options. Perfect for office wear or dressy occasions. Features elastic waistband for comfortable fit.",
            price: "45.99",
            image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
            gender: "Women",
            category: "Skirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Uniqlo",
            createdAt: new Date().toISOString()
        },
        {
            name: "Wool Blend Sweater",
            description: "Cozy crew neck sweater crafted from soft wool blend material. Classic design with ribbed trim at collar, cuffs, and hem. Perfect layering piece for cooler weather.",
            price: "89.99",
            image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
            gender: "Men",
            category: "Sweaters",
            sizes: "S,M,L,XL,XXL",
            brand: "Tommy Hilfiger",
            createdAt: new Date().toISOString()
        },
        {
            name: "Athletic Running Shorts",
            description: "Lightweight running shorts with built-in moisture management and quick-dry technology. Features elastic waistband with drawstring and side pockets. Ideal for workouts or casual summer wear.",
            price: "32.99",
            image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
            gender: "Men",
            category: "Shorts",
            sizes: "S,M,L,XL,XXL",
            brand: "Nike",
            createdAt: new Date().toISOString()
        },
        {
            name: "Cashmere V-Neck Sweater",
            description: "Luxurious cashmere sweater with flattering v-neck design and relaxed fit. Ultra-soft material provides warmth without bulk. Timeless piece that elevates any wardrobe.",
            price: "149.99",
            image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80",
            gender: "Women",
            category: "Sweaters",
            sizes: "S,M,L,XL,XXL",
            brand: "Ralph Lauren",
            createdAt: new Date().toISOString()
        },
        {
            name: "Straight Leg Jeans",
            description: "Classic straight leg jeans with comfortable mid-rise fit and versatile medium wash. Durable denim construction with traditional five-pocket design. Perfect everyday jeans for any occasion.",
            price: "59.99",
            image: "https://images.unsplash.com/photo-1542272454315-7f6d20ab07a0?w=800&q=80",
            gender: "Men",
            category: "Jeans",
            sizes: "S,M,L,XL,XXL",
            brand: "Levi's",
            createdAt: new Date().toISOString()
        },
        {
            name: "Linen Blend Pants",
            description: "Lightweight linen-blend pants with relaxed fit and breathable fabric. Perfect for warm weather with elegant drape and comfortable waistband. Ideal for vacation or casual office settings.",
            price: "64.99",
            image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
            gender: "Women",
            category: "Pants",
            sizes: "S,M,L,XL,XXL",
            brand: "Zara",
            createdAt: new Date().toISOString()
        },
        {
            name: "Graphic Print T-Shirt",
            description: "Trendy graphic t-shirt with bold print design and comfortable cotton construction. Modern fit with crew neck and short sleeves. Statement piece that adds personality to casual outfits.",
            price: "19.99",
            image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
            gender: "Women",
            category: "T-Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "H&M",
            createdAt: new Date().toISOString()
        },
        {
            name: "Bomber Jacket",
            description: "Classic bomber jacket with zippered front and ribbed cuffs and hem. Features side pockets and lightweight construction. Versatile outerwear piece for transitional weather.",
            price: "99.99",
            image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
            gender: "Men",
            category: "Jackets",
            sizes: "S,M,L,XL,XXL",
            brand: "Gap",
            createdAt: new Date().toISOString()
        },
        {
            name: "Chino Shorts",
            description: "Classic chino shorts with flat front and modern slim fit. Crafted from stretch cotton twill for comfort and mobility. Features belt loops and functional pockets for everyday wear.",
            price: "39.99",
            image: "https://images.unsplash.com/photo-1591195120807-235c6a0d83ec?w=800&q=80",
            gender: "Men",
            category: "Shorts",
            sizes: "S,M,L,XL,XXL",
            brand: "Gap",
            createdAt: new Date().toISOString()
        },
        {
            name: "Wrap Dress",
            description: "Sophisticated wrap dress with adjustable tie waist and flattering v-neckline. Flowing fabric creates elegant movement and comfortable fit. Perfect for office, dinner dates, or special occasions.",
            price: "79.99",
            image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&q=80",
            gender: "Women",
            category: "Dresses",
            sizes: "S,M,L,XL,XXL",
            brand: "Calvin Klein",
            createdAt: new Date().toISOString()
        },
        {
            name: "Quilted Puffer Jacket",
            description: "Warm quilted puffer jacket with lightweight insulation and water-resistant exterior. Features zippered pockets and adjustable hood. Essential cold-weather piece with modern slim silhouette.",
            price: "129.99",
            image: "https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=800&q=80",
            gender: "Women",
            category: "Jackets",
            sizes: "S,M,L,XL,XXL",
            brand: "Tommy Hilfiger",
            createdAt: new Date().toISOString()
        },
        {
            name: "Polo Shirt",
            description: "Classic polo shirt with three-button placket and ribbed collar and cuffs. Made from breathable pique cotton for comfort and style. Versatile piece for smart casual occasions.",
            price: "44.99",
            image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=800&q=80",
            gender: "Men",
            category: "Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Tommy Hilfiger",
            createdAt: new Date().toISOString()
        },
        {
            name: "Denim Mini Skirt",
            description: "Trendy denim mini skirt with button-front closure and classic five-pocket design. Comfortable stretch denim with flattering A-line silhouette. Perfect for casual outings and weekend wear.",
            price: "34.99",
            image: "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800&q=80",
            gender: "Women",
            category: "Skirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Levi's",
            createdAt: new Date().toISOString()
        },
        {
            name: "Zip-Up Hoodie",
            description: "Comfortable full-zip hoodie with front pockets and adjustable drawstring hood. Soft fleece interior provides warmth and comfort. Perfect layering piece for athletic or casual wear.",
            price: "49.99",
            image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&q=80",
            gender: "Men",
            category: "Hoodies",
            sizes: "S,M,L,XL,XXL",
            brand: "Adidas",
            createdAt: new Date().toISOString()
        },
        {
            name: "Floral Blouse",
            description: "Feminine floral blouse with delicate print and flowing fabric. Features button-front closure and long sleeves with buttoned cuffs. Elegant piece that transitions from office to evening.",
            price: "52.99",
            image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&q=80",
            gender: "Women",
            category: "Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Zara",
            createdAt: new Date().toISOString()
        },
        {
            name: "Athletic Track Pants",
            description: "Performance track pants with tapered leg and elastic waistband with drawstring. Moisture-wicking fabric keeps you dry during workouts. Features side pockets and zippered ankle cuffs.",
            price: "59.99",
            image: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=800&q=80",
            gender: "Men",
            category: "Pants",
            sizes: "S,M,L,XL,XXL",
            brand: "Nike",
            createdAt: new Date().toISOString()
        },
        {
            name: "Knit Cardigan",
            description: "Cozy knit cardigan with button-front closure and ribbed trim. Soft fabric blend provides warmth and comfort for layering. Features side pockets and relaxed fit for easy styling.",
            price: "69.99",
            image: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=800&q=80",
            gender: "Women",
            category: "Sweaters",
            sizes: "S,M,L,XL,XXL",
            brand: "Uniqlo",
            createdAt: new Date().toISOString()
        },
        {
            name: "Henley Long Sleeve Shirt",
            description: "Casual henley shirt with three-button placket and long sleeves. Soft cotton jersey fabric offers comfort and versatility. Perfect layering piece or standalone casual shirt.",
            price: "29.99",
            image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
            gender: "Men",
            category: "Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Gap",
            createdAt: new Date().toISOString()
        },
        {
            name: "Maxi Dress",
            description: "Flowing maxi dress with empire waist and adjustable straps. Lightweight fabric perfect for warm weather with elegant floor-length hem. Versatile style for beach days or evening events.",
            price: "94.99",
            image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
            gender: "Women",
            category: "Dresses",
            sizes: "S,M,L,XL,XXL",
            brand: "H&M",
            createdAt: new Date().toISOString()
        },
        {
            name: "Cargo Pants",
            description: "Utility-inspired cargo pants with multiple pockets and relaxed fit. Durable cotton blend fabric with adjustable waist. Modern take on classic workwear style for casual occasions.",
            price: "74.99",
            image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80",
            gender: "Men",
            category: "Pants",
            sizes: "S,M,L,XL,XXL",
            brand: "Calvin Klein",
            createdAt: new Date().toISOString()
        },
        {
            name: "Boyfriend Jeans",
            description: "Relaxed fit boyfriend jeans with distressed details and rolled cuffs. Comfortable stretch denim with vintage wash. Effortlessly cool style that pairs with any casual top.",
            price: "64.99",
            image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?w=800&q=80",
            gender: "Women",
            category: "Jeans",
            sizes: "S,M,L,XL,XXL",
            brand: "Gap",
            createdAt: new Date().toISOString()
        },
        {
            name: "V-Neck T-Shirt Pack",
            description: "Essential v-neck t-shirt in classic colors for everyday wear. Soft cotton construction with comfortable fit and durable stitching. Wardrobe staple that layers well or stands alone.",
            price: "15.99",
            image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
            gender: "Men",
            category: "T-Shirts",
            sizes: "S,M,L,XL,XXL",
            brand: "Uniqlo",
            createdAt: new Date().toISOString()
        },
        {
            name: "High-Waisted Shorts",
            description: "Trendy high-waisted shorts with cuffed hem and belt loops. Made from lightweight cotton twill for warm weather comfort. Features front and back pockets with flattering leg length.",
            price: "36.99",
            image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800&q=80",
            gender: "Women",
            category: "Shorts",
            sizes: "S,M,L,XL,XXL",
            brand: "Zara",
            createdAt: new Date().toISOString()
        }
    ];

    await db.insert(products).values(sampleProducts);
    
    console.log('✅ Seeded 30 products successfully');
}

seed().catch((error) => {
    console.error('❌ Seeder failed:', error);
});