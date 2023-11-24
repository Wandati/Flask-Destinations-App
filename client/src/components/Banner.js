// import React from "react";
// import { Link } from "react-router-dom";

// function Banner() {
//   return (
//     <section className="h-full max-h-[1200px] mb-8 xl:mb-24">
//       <div className="flex flex-col lg:flex-row mt-20">
//         <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
//           <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
//             <span className="text-[#007423]">Magical</span> Kenya
//           </h1>
//           <p className="max-w-[480px] mb-8">
//             Kenya is a country in East Africa with coastline on the Indian
//             Ocean. It encompasses savannah, lakelands, the dramatic Great Rift
//             Valley and mountain highlands. It's also home to wildlife like
//             lions, elephants and rhinos. From Nairobi, the capital, safaris
//             visit the Maasai Mara Reserve, known for its annual wildebeest
//             migrations, and Amboseli National Park, offering views of Tanzania's
//             5,895m Mt. Kilimanjaro.
//           </p>
//         </div>

//         <div className="flex-1 lg:flex justify-end items-end mx-8">
//           <img
//             src="https://media-cdn.tripadvisor.com/media/photo-c/1280x250/14/10/2e/f2/kenya.jpg"
//             alt=""
//           />
//         </div>
//       </div>

//       <div className="flex flex-col lg:flex-row mt-20 min-h-[600px]">
//         <div className="lg:ml-8 xl:ml-[135px] flex flex-col items-center lg:items-start text-center lg:text-left justify-center flex-1 px-4 lg:px-0">
//           <h1 className="text-4xl lg:text-[58px] font-semibold leading-none mb-6">
//             Visit your Dream{" "}
//             <span className="text-[#007423]">Destinations in Kenya</span>
//           </h1>
//           <p className="max-w-[480px] mb-8">
//             Experience Kenya like never before with our Destinations App – the
//             ultimate travel companion. From the Maasai Mara to Diani's sandy
//             shores, explore diverse landscapes and cultural treasures. Dive into
//             Nairobi's lively markets or uncover Lamu's historic charm. Our app
//             provides curated insights for an unforgettable journey, blending
//             wildlife adventures, cultural discoveries, and serene getaways. Your
//             Kenyan adventure starts here
//           </p>
//           <span className="inline-block bg-[#007423] rounded-full px-3 py-1 text-sm text-white font-semibold text-[#1a3813]mr-2 mb-2 hover:bg-[#068f2f] ">
//             <Link to={`/destinations`}>Click to view Destinations</Link>{" "}
//           </span>
//         </div>

//         <div className="flex items-end mx-8 ml-16 ">
//           <div className="py-4 max-w-[200px] pt-2 pb-6">
//             <img
//               src="https://images.pexels.com/photos/4253835/pexels-photo-4253835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
//               alt=""
//             />
//           </div>
//           <div className="py-10 mx-3 max-w-[200px] max-h-[900px] pt-8 pb-12">
//             <img
//               src="https://images.pexels.com/photos/12959528/pexels-photo-12959528.jpeg?auto=compress&cs=tinysrgb&w=400"
//               alt=""
//             />
//           </div>
//           <div className="py-5 max-w-[300px] max-h-[800px] pt-12 pb-6">
//             <img
//               src="https://images.pexels.com/photos/10711116/pexels-photo-10711116.jpeg?auto=compress&cs=tinysrgb&w=1600"
//               alt=""
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Banner;
import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <section className="mb-8 lg:mb-24 p-4 md:p-8">
      <div className="flex flex-col items-center lg:flex-row justify-center lg:justify-between">
        <div className="lg:ml-0 lg:mr-8 text-center lg:text-left">
          <h1 className="text-2xl lg:text-4xl font-semibold leading-none mb-3 lg:mb-6">
            <span className="text-[#007423]">Magical</span> Kenya
          </h1>
          <p className="max-w-md mb-6 text-sm lg:text-base">
            Kenya is a country in East Africa with coastline on the Indian
            Ocean. It encompasses savannah, lakelands, the dramatic Great Rift
            Valley, and mountain highlands.
          </p>
        </div>

        <div className="mb-6 lg:mb-0">
          <img
            className="w-full h-32 lg:h-full object-cover"
            src="https://media-cdn.tripadvisor.com/media/photo-c/1280x250/14/10/2e/f2/kenya.jpg"
            alt=""
          />
        </div>
      </div>

      <div className="flex flex-col items-center lg:flex-row justify-center lg:justify-between mt-6 lg:mt-12">
        <div className="lg:ml-0 lg:mr-8 text-center lg:text-left">
          <h1 className="text-2xl lg:text-4xl font-semibold leading-none mb-3 lg:mb-6">
            Visit your Dream <br></br>
            <span className="text-[#007423] ">Destinations in Kenya</span>
          </h1>
          <p className="max-w-md mb-6 text-sm lg:text-base">
            Experience Kenya like never before with our Destinations App – the
            ultimate travel companion. From the Maasai Mara to Diani's sandy
            shores, explore diverse landscapes and cultural treasures.
          </p>
          <span className="inline-block bg-[#007423] rounded-full px-3 py-1 text-xs lg:text-sm text-white font-semibold mb-2 hover:bg-[#068f2f]">
            <Link to={`/destinations`}>Click to view Destinations</Link>
          </span>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center">
          <div className="mb-4 lg:mb-0 mx-3 max-w-xs lg:max-w-[200px]">
            <img
              className="w-full h-24 lg:h-40 object-cover"
              src="https://images.pexels.com/photos/4253835/pexels-photo-4253835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
            />
          </div>
          <div className="mb-4 lg:mb-0 mx-3 max-w-xs lg:max-w-[200px]">
            <img
              className="w-full h-24 lg:h-40 object-cover"
              src="https://images.pexels.com/photos/12959528/pexels-photo-12959528.jpeg?auto=compress&cs=tinysrgb&w=400"
              alt=""
            />
          </div>
          <div className="mx-3 max-w-xs lg:max-w-[300px]">
            <img
              className="w-full h-24 lg:h-40 object-cover"
              src="https://images.pexels.com/photos/10711116/pexels-photo-10711116.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
