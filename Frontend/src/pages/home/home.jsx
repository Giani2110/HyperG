import React, { useEffect } from "react";
import LandingHeader from "../../components/headers/LandingHeader";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faHeadset,
  faRocket,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: "ease-in-out",
      anchorPlacement: "top-bottom",
    });
  }, []);

  return (
    <div className="bg-gray-900 text-white">
      <LandingHeader />

      <section className="relative h-[75vh] w-full bg-black mt-24">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <div className="absolute inset-0 flex items-center justify-start pl-16 z-20">
          <div className="text-left" data-aos="fade-right">

            <h1 className="text-4xl font-extrabold text-white mb-4">HyperG</h1>
            <p className="text-xl text-white mb-6 max-w-lg">
              La plataforma de juegos en la que disfrutarás sin limitaciones.
            </p>
          </div>
        </div>

        <img
          src="img/banner.jpg"
          alt="banner"
          className="w-full h-full object-cover object-center z-0 opacity-50 absolute inset-0"
        />
      </section>

      <section id="explore" className="py-16 bg-gray-900">
        <div className="container mx-auto text-center">
          <h2
            className="text-3xl font-semibold text-white mb-8"
            data-aos="fade-up"
          >
            Explora lo que tenemos para ti
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div
              className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
            >
              <FontAwesomeIcon
                icon={faGamepad}
                className="text-4xl mb-4 text-blue-500"
              />
              <h3 className="text-lg font-bold mb-4">Catálogo Extenso</h3>
              <p>
                Disfruta de una increíble variedad de juegos, desde los más
                populares hasta los más exclusivos.
              </p>
            </div>
            <div
              className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
            >
              <FontAwesomeIcon
                icon={faHeadset}
                className="text-4xl mb-4 text-green-500"
              />
              <h3 className="text-lg font-bold mb-4">Audio y Vídeo</h3>
              <p>
                Disfruta de una experiencia de juego completa con audio y video.
              </p>
            </div>
            <div
              className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
            >
              <FontAwesomeIcon
                icon={faRocket}
                className="text-4xl mb-4 text-red-500"
              />
              <h3 className="text-lg font-bold mb-4">Compra Rápida</h3>
              <p>
                Compra juegos en cuestión de minutos gracias a nuestra interfaz
                rápida y sencilla.
              </p>
            </div>
            <div
              className="bg-gray-700 p-6 rounded-lg transform hover:scale-105 transition duration-300"
              data-aos="fade-up"
            >
              <FontAwesomeIcon
                icon={faComments}
                className="text-4xl mb-4 text-yellow-500"
              />
              <h3 className="text-lg font-bold mb-4">Comunidad</h3>
              <p>
                Conecta con otros jugadores y comparte tu pasión por los
                videojuegos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-800">
        <div className="container mx-auto text-center">
          <h2
            className="text-3xl font-semibold text-white mb-8"
            data-aos="fade-up"
          >
            Más Características
          </h2>
          <p className="text-lg mb-6 max-w-3xl mx-auto" data-aos="fade-up">
            HyperG no solo es una tienda. ¡Es un lugar para que disfrutes de lo
            que más te gusta! Con opciones únicas y una experiencia de compra
            rápida, te aseguramos que no querrás irte.
          </p>
          <a
            href="register"
            className="inline-block bg-yellow-600 hover:bg-yellow-500 text-white px-8 py-3 rounded-full text-xl transition duration-300 shadow-lg"
            data-aos="zoom-in"
          >
            Únete a HyperG
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
