import { parse } from "path";

export default class ProductModel{
    constructor(id,name,price,image,quantity,type,category,toggle=false){
        this.id=id;
        this.name=name;
        this.price=price;
        this.image=image;
        this.quantity=quantity;
        this.type=type;
        this.category=category;
        this.toggle=toggle
    }
    static getAll(){
        return allProducts;
    }
    static addOneProduct(body){
        const {name,price,image,quantity,type,category}=body;
        const oneProduct=new ProductModel(allProducts.length+1,name,price,image,1,type,category);
        allProducts.push(oneProduct);
        return oneProduct;
    }
    static getFilterProduct(price,category){
        if(price && category){
            const allCategories=category.split(",");
            const filterProduct=allCategories.flatMap((elm)=>allProducts.filter((item)=>parseFloat(item.price)<=parseFloat(price) && item.category===elm));
            return filterProduct; 
        }else if(category){
            const allCategories=category.split(",");
            const filterProducts=allCategories.flatMap((elm)=>allProducts.filter((item)=>item.category===elm));
            return filterProducts;
        }else if(price){
            const filterProducts=allProducts.filter((elm)=>parseFloat(elm.price)<=parseFloat(price));
            return filterProducts;
        }else{
            return allProducts;
        }
    }
    static getSearchProductByName(productName){
        if(productName){
            const searchProduct=allProducts.filter((elm)=>elm.name===productName);
            console.log("getSearchProductByName");
            console.log(searchProduct);
            return searchProduct;
        }else{
            return allProducts;
        }
    }
}
var allProducts=[

    new ProductModel(
        1,"Mens Cotton Jacket",1155,"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",1,["Clothing","cloth","clothing","Cloth","Mens Cotton Jacket","Men's Clothing"],"Men's Clothing",false
    ),
    new ProductModel(
        2,"Mens Casual Slim Fit",900,"https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",1,["Clothing","cloth","clothing","Cloth","Mens Casual Slim Fit","Men's Clothing"],"Men's Clothing",false
    ),
    new ProductModel(
        4,"Acer SB220Q bi 21.5 inches Full HD",45250,"https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",1,["Electronics","electronics","Acer SB220Q bi 21.5 inches Full HD"],"Electronics"
    ),
    new ProductModel(
        5,"WD 4TB Gaming Drive Works with Play",25250,"https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",1,["Electronics","electronics","WD 4TB Gaming Drive Works with Play"],"Electronics"
    ),
    new ProductModel(
        6,"DANVOUY Womens T Shirt Casual Cotton",999,"https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",1,["Clothing","clothing","Cloth","cloth","DANVOUY Womens T Shirt Casual Cotton"],"Women's Clothing"
    ),
    new ProductModel(
        7,"Acer SB220Q bi 21.5 inches Full HD",19900,"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",1,["Electronics","electronics","Acer SB220Q bi 21.5 inches Full HD"],"Electronics"
    ),
    new ProductModel(
        8,"White Gold Plated Princess",3950,"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",1,["Jewelery","jewelery","White Gold Plated Princess"],"Jewelery"
    ),
    new ProductModel(
        9,"WD 2TB Elements Portable External H",999,"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",1,["electronics","Electronics","WD 2TB Elements Portable External H"],"Electronics"
    ),
    new ProductModel(
        10,"Pierced Owl Rose Gold Plated Stainl",10999,"https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",1,["Jewelery","jewelery","Pierced Owl Rose Gold Plated Stainl"],"Jewelery"
    ),
    new ProductModel(
        12,"Acer SB220Q bi 21.5 inches Full HD",19900,"https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",1,["Electronics","electronics","Acer SB220Q bi 21.5 inches Full HD"],"Electronics"
    ),
    new ProductModel(
        13,"White Gold Plated Princess",3950,"https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",1,["Jewelery","jewelery","White Gold Plated Princess"],
        "Jewelery"
    ),
    new ProductModel(
        14,"WD 2TB Elements Portable External H",999,"https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",1,["Electronics","electronics","WD 2TB Elements Portable External H"],"Electronics"
    ),
    new ProductModel(
        15,"BRUTON Men Sport Shoes",499,"https://m.media-amazon.com/images/I/61VHvg7wvCL._SY695_.jpg",1,["shoes","Shoes","BRUTON Men Sport Shoes","Man's Shoes"],"Men's Shoes"
    ),
    new ProductModel(
        16,"ASICS Men's Gel-Rocket 11 Indoor Sports Shoes",6499,"https://m.media-amazon.com/images/I/71qNi24OMNL._SY695_.jpg",1,["shoes","Shoes","ASICS Men's Gel-Rocket 11 Indoor Sports Shoes","Man's Shoes"],"Man's Shoes"
    ),
    new ProductModel(
        17,
        "new balance Men's Athletic Stability Tennis Shoe",30988,"https://m.media-amazon.com/images/I/618uqWzG5ZL._SY695_.jpg",1,["shoes","Shoes","new balance Men's Athletic Stability Tennis Shoe White 7 D(M) US","Man's Shoes"],"Man's Shoes"
    ),
    new ProductModel(
        18,"HEALTH FIT Super Comfortable & Breathable Soft Shoes",1799,"https://m.media-amazon.com/images/I/51H1BJClcWL._SY695_.jpg",1,["shoes","Shoes","HEALTH FIT Super Comfortable & Breathable Soft Sole Ultra-Lightweight Shoes","Man's Shoes"],"Man's Shoes"
    ),
    new ProductModel(
        19,"Topo Athletic Men's MTN Racer 3 Lightweight Shoes",49999,"https://m.media-amazon.com/images/I/713ezWdeDcL._SX695_.jpg",1,["shoes","Shoes","Topo Athletic Men's MTN Racer 3 Comfortable Lightweight Shoes","Men's Shoes"],"Men's Shoes"
    ),
    new ProductModel(
        20,"Apple Watch Series 10 [GPS 42 mm]",24349,"https://m.media-amazon.com/images/I/61I431q8rhL._SX679_.jpg",1,["electronics","Electronics","Apple Watch Series 10 [GPS 42 mm]"],"Electronics"
    ),
    new ProductModel(
        21,"Apple iPad Pro 11″ (M4): Ultra Retina XDR Display",128049,"https://m.media-amazon.com/images/I/61732VrXNnL._SX679_.jpg",1,["electronics","Electronics","Apple iPad Pro 11″ (M4): Ultra Retina XDR Display"],"Electronics"
    ),
    new ProductModel(
        22,"Aiwa 108 cm (43 inches) Google TV ",22299,"https://m.media-amazon.com/images/I/81usGDREkgL._SX679_.jpg",1,["electronics","Electronics","Aiwa 108 cm (43 inches) Google TV | Full HD"],"Electronics"
    ),
    new ProductModel(
        23,"Smart Google TV L43M8-5XIN (Black)",30999,"https://m.media-amazon.com/images/I/81DThWoxTuL._SX679_.jpg",1,["electronics","Electronics","Smart Google TV L43M8-5XIN (Black)"],"Electronics"
    ),
    new ProductModel(
        24,"Leriya Fashion Western Dress",483,"https://m.media-amazon.com/images/I/51Q6gdK8LuL._SX679_.jpg",1,["Clothing","cloth","clothing","Cloth","Leriya Fashion Western Dress || Rayon Solid Button","Womens's Clothing"],"Womens's Clothing"
    ),
    new ProductModel(
        25,"Flared sports trousers with SoftMove",2699,"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fdb%2Fee%2Fdbee17b0e83e441069fa2f2f55c9781b2a2ddb66.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5Bladies_sport_bottoms_trousers%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",1,["Clothing","cloth","clothing","Cloth","Flared sports trousers with SoftMove","Womens's Clothing"],"Women's Clothing"
    ),
    new ProductModel(
        26,"Oversized motif-detail T-shirt",1299,"https://image.hm.com/assets/hm/9d/e3/9de3a6bc7956d853d073a77b1bd802139e5fc6eb.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth","Oversized motif-detail T-shirt","Womens's Clothing"],"Women's Clothing"
    ),
    new ProductModel(
        27,"Puma Womens Softride Mayve WN's Res Shoe",5499,"https://m.media-amazon.com/images/I/513Jcw9cFCL._SY695_.jpg",1,["shoes","Shoes","Puma Womens Softride Mayve WN's Res Running Shoe","Womens's Shoes"],"Women's Shoes"
    ),
    new ProductModel(
        28,"Campus OGL-13 Women's Lace-Up Sneakers",1398,"https://m.media-amazon.com/images/I/61ciOUORC9L._SY695_.jpg",1,["shoes","Shoes","Campus OGL-13 Women's Lace-Up Sneakers","Womens's Shoes"],"Women's Shoes"
    ),
    new ProductModel(
        29,"ZAVERI PEARLS Pink Green Beads Stones",19000,"https://m.media-amazon.com/images/I/71N2z0cVfWL._SY695_.jpg",1,["jewelery","Jewelery","ZAVERI PEARLS Pink Green Beads Dazzling Stones"],"Jewelery"
    ),
    new ProductModel(
        30,"18K Gold Plated Traditional Stylish Golden Necklace ",84499,"https://m.media-amazon.com/images/I/71jzKmmzLrL._SY695_.jpg",1,["jewelery","Jewelery","18K Gold Plated Traditional Stylish Golden Necklace "],"Jewelery"
    ),
    new ProductModel(
        31,"Gold Necklace & Earrings Set for Women",82640,"https://m.media-amazon.com/images/I/81r3E0G97kL._SX695_.jpg",1,["jewelery","Jewelery","Gold Necklace & Earrings Set for Women"],"Jewelery"
    ),
    new ProductModel(
        32,"Sports top with DryMove",1299,"https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F45%2Fcf%2F45cf98f47c422c8a9975a48ff962cc7d4259f78e.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BDESCRIPTIVESTILLLIFE%5D%2Cres%5Bm%5D%2Chmver%5B2%5D&call=url[file:/product/main]",1,["Clothing","cloth","clothing","Cloth","Sports top with DryMove","Womens's Clothing"],"Women's Clothing"
        ),
    new ProductModel(
        33,"Sports zip-through hoodie",2699,"https://image.hm.com/assets/hm/1e/38/1e388985d11a4da77dfef908b29a7afc4f8fa6bb.jpg?imwidth=1536",1,["Clothing","cloth","Cloth","clothing","Sports zip-through hoodie","Womens's Clothing"],"Women's Clothing"
        ),
    new ProductModel(
        34,"Canvas crossbody bag",1999,"https://m.media-amazon.com/images/I/71Sj5ko3UYL._AC_SX679_.jpg",1,["bags","Bags","Canvas crossbody bag",],"Bags"
        ),
    new ProductModel(
        35,"KENNETH COLE stylish & trendy Women's Bag",1770,"https://m.media-amazon.com/images/I/613rmd2lCXL._SY695_.jpg",1,["bags","Bags","KENNETH COLE stylish & trendy Women's Bag"],"Bags"
        ),
    new ProductModel(
        36,"Lavie Luxe Women's Mono Rumba 2c Satchel Handbag",3150,"https://m.media-amazon.com/images/I/71lrgy2P8xL._SY695_.jpg",1,["bags","Bags","Lavie Luxe Women's Mono Rumba 2c Satchel Handbag"],"Bags"
        ),
    new ProductModel(
        37,"Lavie Luxe Gehry Women's Satchel Handbag",3599,"https://m.media-amazon.com/images/I/71Sa+Ma483L._SY695_.jpg",1,["bags","Bags","Lavie Luxe Gehry Women's Satchel Handbag"],"Bags"
        ),
    new ProductModel(
        38,"Loose Jeans",2999,"https://image.hm.com/assets/hm/f5/9b/f59b0eba8d8c8a3ae6fc6d02cb5e3efa0875dd31.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth","Loose Jeans"],"Men's Clothing"
        ),
    new ProductModel(
        39,"Loose Fit Printed T-Shirt",699,"https://image.hm.com/assets/hm/d3/5c/d35c622819e98c67f3442c9e4dc46771a189a9ea.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth","Loose Fit Printed T-Shirt"],"Men's Clothing"
        ),
    new ProductModel(
        40,"Regular Fit twill cargo trousers",3999,"https://image.hm.com/assets/hm/a4/2d/a42d43d85ae63a68de02a87aeb99250201bb4027.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth"],"Regular Fit twill cargo trousers"
        ),
    new ProductModel(
        41,"Regular Fit Oxford shirt",1499,"https://image.hm.com/assets/hm/68/57/68574ee51428689db0936e61f16faf3535b96422.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth","Regular Fit Oxford shirt"],"Men's Clothing"
        ),
    new ProductModel(
        42,"10-pack socks",1499,"https://m.media-amazon.com/images/I/71o7Jfjl5aL._AC_SX679_.jpg",1,["Clothing","cloth","clothing","Cloth","10-pack socks"],"Men's Clothing"
    ),
    new ProductModel(
        43,"Regular Fit Windbreaker",2999,"https://image.hm.com/assets/hm/52/24/5224f6c66d35cd2abc65fed44e11c2a65189a3b3.jpg?imwidth=1260",1,["Clothing","cloth","clothing","Cloth","Regular Fit Windbreaker"],"Men's Clothing"
    ),
    new ProductModel(
        44,"Lymio Men Polyester Jackets || Bomber Jacket For Men",899,"https://m.media-amazon.com/images/I/617PqifhwSL._AC_UL640_FMwebp_QL65_.jpg",1,["Clothing","cloth","clothing","Cloth","Lymio Men Polyester Jackets || Bomber Jacket For Men"],"Men's Clothing"
    ),
    new ProductModel(
        45,"TOPLOT jacket for men",1599,"https://m.media-amazon.com/images/I/61EtFyskGfL._SY879_.jpg",1,["Clothing","cloth","clothing","Cloth","TOPLOT jacket for men || winter jackets for men"],"Men's Clothing"
    ),
    new ProductModel(
        46,"BLACKSTEP Women's Fleece Sherpa Hoodie",699,"https://m.media-amazon.com/images/I/41KeNECL1aL.jpg",1,["Clothing","cloth","clothing","Cloth","BLACKSTEP Women's Fleece Sherpa Hoodie"],"Men's Clothing"
    ),
    new ProductModel(
        47,"CK INNERWEAR Presents Strechable Underwear for Men", 494,"https://m.media-amazon.com/images/I/71By9Jeqo5L._SX679_.jpg",1,["Clothing","cloth","clothing","Cloth","BLACKSTEP Women's Fleece Sherpa Hoodie"],"Men's Clothing"
    ),
    new ProductModel(
        48,"TAGAS Men's Regular Jacket Fit For Casual Wear",1299,"https://m.media-amazon.com/images/I/61yp3ndG1JL._SY879_.jpg",1,["Clothing","cloth","clothing","Cloth","TAGAS Men's Regular Jacket Fit For Casual Wear || Low-Cut Standing Collar || Full Sleeve "],"Men's Clothing"
    ),
    new ProductModel(
        49,"WEAR TO GO Unisex Adult Cotton ALPHA Varsity jacket",711,"https://m.media-amazon.com/images/I/51nXSH9k28L._SX679_.jpg",1,["Clothing","cloth","clothing","Cloth","WEAR TO GO Unisex Adult Cotton ALPHA Varsity jacket"],"Men's Clothing"
    ),
    new ProductModel(
        50,"Puma Men Nylon & Net Colorblock Standard Length Padded Jacket",3999,"https://m.media-amazon.com/images/I/71fScFDr+OL._SX679_.jpg",1,["Clothing","cloth","clothing","Cloth","Puma Men Nylon & Net Colorblock Standard Length Padded Jacket"],"Men's Clothing"
    ),
    new ProductModel(
        51,"AGARO Callus Remover with 3 Interchangeable Head Rollers",899,"https://m.media-amazon.com/images/I/61-Tb1sCfmL._SX679_.jpg",1,["electronics","Electronics","AGARO Callus Remover with 3 Interchangeable Head Rollers"],"Electronics"
    ),
    new ProductModel(
        52,"Noise Colorfit Icon 2 1.8'', AI Voice Assistant Smartwatch",1099,"https://rukminim2.flixcart.com/image/612/612/xif0q/smartwatch/s/i/u/-original-imah76jt64ffmwg4.jpeg?q=70",1,["electronics","Electronics","Noise Colorfit Icon 2 1.8'', AI Voice Assistant Smartwatch"],"Electronics"
    ),
    new ProductModel(
        53,"LG 2025 Mode AI Plus Convertible 6-in-1 1.5 Ton 5 Star",48990,"https://m.media-amazon.com/images/I/814uYcqrtoL._AC_UL640_FMwebp_QL65_.jpg",1,["electronics","Electronics","LG 2025 Mode AI Plus Convertible 6-in-1 1.5 Ton 5 Star"],"Electronics"
    ),
    new ProductModel(
        54,"Cruise 1 Ton 3 Star Inverter Split AC with 7-Stage Air Filtration ",26990,"https://m.media-amazon.com/images/I/61rIsrS2LIL._AC_UL640_FMwebp_QL65_.jpg",1,["electronics","Electronics","Cruise 1 Ton 3 Star Inverter Split AC with 7-Stage Air Filtration "],"Electronics"
    ),
    new ProductModel(
        55,"Panasonic 2 Ton 3 Star Wi-Fi Inverter Smart Split AC",50990,"https://m.media-amazon.com/images/I/31HiPUw5xIL._AC_UF480,480_SR480,480_.jpg",1,["electronics","Electronics","Panasonic 2 Ton 3 Star Wi-Fi Inverter Smart Split AC "],"Electronics"
    ),
    new ProductModel(
        56,"One94Store acrylic Romantic Ocean Wave Night Light Projector Lamp",259,"https://m.media-amazon.com/images/I/51pV8Z++84L.jpg",1,["electronics","Electronics","One94Store acrylic Romantic Ocean Wave Night Light Projector Lamp"],"Electronics"
    ),
    new ProductModel(
        57,"Sony BRAVIA 3 Series 164 cm (65 inches) 4k LED Google TV",96990,"https://m.media-amazon.com/images/I/418p0EjmkhL._SR480,440_.jpg",1,["electronics","Electronics","Sony BRAVIA 3 Series 164 cm (65 inches) 4K Ultra HD AI Smart LED Google TV K-65S30B"],"Electronics"
    ),
    new ProductModel(
        58,"ADISA Women's Girls Cross Body Sling Bag with Pouch",494,"https://m.media-amazon.com/images/I/51VyTkeXgLL._SY695_.jpg",1,["bags","Bags","ADISA Women's Girls Cross Body Sling Bag with Pouch"],"Bags"
    ),
    new ProductModel(
        59,"BULLMER Trendy Clothing Set with Shirt & Pants Co-ords for Men",870,"https://m.media-amazon.com/images/I/61JxTwwj-5L._SY879_.jpg",1,["Clothing","cloth","clothing","Cloth","BULLMER Trendy Clothing Set with Shirt & Pants Co-ords for Men"],"Men's Clothing"
    ),
    new ProductModel(
        60,"Bacca Bucci Men's Running Shoe",1399,"https://m.media-amazon.com/images/I/61r9oNywMeL._SY695_.jpg",1,["shoes","Shoes","Bacca Bucci Men's Running Shoe","Man's Shoes"],"Man's Shoes"
    ),
    new ProductModel(
        61,"8 Pack Artificial Plastic Eucalyptus Plants Small",2400,"https://m.media-amazon.com/images/I/8139T8YbdkL._SX679_.jpg",1,["decoration","Decoration","8 Pack Artificial Plastic Eucalyptus Plants Small","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        62,"TIED RIBBONS Set of 4 Miniature Buddha Monk Statues",174,"https://m.media-amazon.com/images/I/71WBIhxYlZL._SX679_.jpg",1,["decoration","Decoration","TIED RIBBONS Set of 4 Miniature Buddha Monk Statues ","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        63,"Plants with Pot|Realistic Looking| Multi Variety",390,"https://m.media-amazon.com/images/I/710jjgj13jL._SX679_.jpg",1,["decoration","Decoration","Plants with Pot|Realistic Looking| Multi Variety","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        64,"IT2M MDF Wall Hanging For Home Décor For Living Room",240,"https://m.media-amazon.com/images/I/71GgUWb+qEL._AC_UL640_FMwebp_QL65_.jpg",1,["decoration","Decoration","IT2M MDF Wall Hanging For Home Décor For Living Room Bedroom","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        65,"Home Decor Showpiece Donut Vase 6 & 8 Inches",799,"https://m.media-amazon.com/images/I/713xOgFeEhL._SX679_.jpg",1,["decoration","Decoration","Home Decor  Showpiece Donut Vase 6 & 8 Inches","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        66,"Dime Store Wall Decor Wall Shelves for Home Decor ",440,"https://m.media-amazon.com/images/I/715XY0JNcZL._SY879_.jpg",1,["decoration","Decoration","Dime Store Wall Decor Wall Shelves for Home Decor ","House Decoration"],"House Decoration"
    ),
    new ProductModel(
        67,"JD FRESH 5 Tier Metal Floor Lamp with Shelves",2499,"https://m.media-amazon.com/images/I/71ZZr68FBjL._SX679_.jpg",1,["decoration","Decoration","JD FRESH 5 Tier Metal Floor Lamp with Shelves"],"House Decoration"
    ),
    new ProductModel(
        68,"Artvibes Meditating Gautam Buddha Wooden Wall",199,"https://m.media-amazon.com/images/I/71Di7jfYiQL._SX679_.jpg",1,["decoration","Decoration","Artvibes Meditating Gautam Buddha Wooden Wall"],"House Decoration"
    ),
    new ProductModel(
        69,"Crocon Green Jade Gemstone Money Tree",899,"https://m.media-amazon.com/images/I/81BZqFMV7LL._SX679_.jpg",1,["decoration","Decoration","Crocon Green Jade Gemstone Money Tree"],"House Decoration"
    ),
    new ProductModel(
        70,"Artvibes Wooden Wall Hanger for Home",229,"https://m.media-amazon.com/images/I/61njZPf3KlL._SX679_.jpg",1,["decoration","Decoration","Artvibes Wooden Wall Hanger for Home"],"House Decoration"
    ),
    new ProductModel(
        71,"Areezo Modern Spiral 3 Ring LED Chandelier",2250,"https://m.media-amazon.com/images/I/41zSQ+-yDoL.jpg",1,["decoration","Decoration","Areezo Modern Spiral 3 Ring LED Chandelier"],"House Decoration"
    ),
    new ProductModel(
        72,"Avior Modern Design Wall Light/Wall Lamp for Bedroom",699,"https://m.media-amazon.com/images/I/41Mvj4t-Z8S._SX679_.jpg",1,["decoration","Decoration","Avior Modern Design Wall Light/Wall Lamp for Bedroom"],"House Decoration"
    ),
    new ProductModel(
        73,"Groeien newPT-X3VH-0ZIP 40-Watts Antique Hanging Lamp",825,"https://m.media-amazon.com/images/I/31L7Jr21+SL._SX342_SY445_.jpg",1,["decoration","Decoration","Groeien newPT-X3VH-0ZIP 40-Watts Antique Hanging Lamp"],"House Decoration"
    ),
    new ProductModel(
        74,"Groeien 3 Lights Cluster Chandelier Diamond Light",788,"https://m.media-amazon.com/images/I/61HTlYUxKWL._SX679_.jpg",1,["decoration","Decoration","Groeien 3 Lights Cluster Chandelier Diamond Hanging Pendant Light"],"House Decoration"
    ),
    new ProductModel(
        75,"BENHEK® Retro Style Hena Wall Lamp with Bulb",999,"https://m.media-amazon.com/images/I/31CXdeCEgwL._SY445_SX342_QL70_FMwebp_.jpg",1,["decoration","Decoration","BENHEK® Retro Style Hena Wall Lamp with Bulb"],"House Decoration"
    ),
    new ProductModel(
        76,"Harold Electricals Crown Prince Wall Light",3999,"https://m.media-amazon.com/images/I/61fo5MtyibL._SX679_.jpg",1,["decoration","Harold Electricals Crown Prince Wall Light | Golden Wall Lamp"],"House Decoration"
    ),
    new ProductModel(
        77,"CELLO Checkers Pet Plastic Airtight Canister Set",579,"https://m.media-amazon.com/images/I/51nbqUW7ClL._AC._SR180,230.jpg",1,["kitchen","Kitechen","CELLO Checkers Pet Plastic Airtight Canister Set"],"Kitchen"
    ),
    new ProductModel(
        78,"ATOM Digital Kitchen Food Weighing Scale For Healthy Living",205,"https://m.media-amazon.com/images/I/41Gtmr4785L._SY445_SX342_QL70_FMwebp_.jpg",1,["kitchen","Kitechen","CELLO Checkers Pet Plastic Airtight Canister Set"],"Kitchen"
    ),
    new ProductModel(
        79,"ABOUT SPACE Glass Bud Flower Vase",1650,"https://m.media-amazon.com/images/I/41KtF7M-CCL._SX300_SY300_QL70_FMwebp_.jpg",1,["decoration","Decoration","ABOUT SPACE Glass Bud Flower Vase"],"House Decoration"
    ),
    new ProductModel(
        80,"UHUD CRAFTS Antique Wooden Fold-able Coffee Table",379,"https://m.media-amazon.com/images/I/51eoKWxpEQL._SX679_.jpg",1,["decoration","Decoration","UHUD CRAFTS Antique Wooden Fold-able Coffee Table"],"House Decoration"
    ),
    ]
// AIzaSyBoK-5tm6tFeCHJkFrWpH166JeXz6Dkp8Y