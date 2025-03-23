<template>
  <section class="relative h-128 bg-cover bg-center flex items-center justify-center text-white" style="background-image: url('/banner.webp');">
    <div class="text-center bg-opacity-50 p-4 rounded-lg">
    </div>
    <a class="" href="#suscripciones">
    <BotonComienzaTuCambio/>

  </a>
  </section>

  <section id="diferencias" class="py-12 bg-gray-100 text-center">
  <h1 class="text-3xl sm:text-5xl font-bold mb-6 text-gray-800">Descubre la diferencia entre <span class="text-green-500">LongLife</span> y hacerlo por tu cuenta</h1>

  <div class="flex flex-col sm:flex-row justify-center gap-8 max-w-6xl mx-auto">
    <!-- Contenedor de Beneficios -->
    <div class="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2">
      <p class="text-lg font-semibold flex items-center justify-center gap-2">
        Metodo LongLife <Beneficios class="w-6 h-6 text-green-500" />
      </p>
      <p class="text-gray-600 flex mt-2 text-left gap-2" v-for="(ventaja, index) in ventajas" :key="index">
        <Positivo class="w-20 h-20 text-green-500" />
        {{ ventaja }}
      </p>
    </div>

    <!-- Contenedor de Desventajas -->
    <div class="bg-white p-6 rounded-lg shadow-md w-full sm:w-1/2">
      <p class="text-lg font-semibold flex items-center justify-center gap-2">
        Por tu cuenta <Desventajas class="w-6 h-6 text-red-500" />
      </p>
      <p class="text-gray-600 mt-2 flex text-left gap-2" v-for="desventaja in desventajas">
        <Negativo class="w-20" />
        {{ desventaja }}
      </p>
    </div>
  </div>
</section>



<section id="suscripciones" class="py-12 px-6 text-center">
  <h4 class="text-green-500 font-bold text-lg tracking-wide uppercase">
    Tu cambio físico y de vida
  </h4>
  <h1 class="font-bold text-3xl sm:text-5xl text-gray-800 mt-2 max-w-3xl mx-auto">
    Esto es lo que consigues si te suscribes a LongLife
  </h1>
  <Suscripciones/>
</section>


</template>

  <script setup>
  import Beneficios from '../components/icons/Beneficios.vue';
import BotonComienzaTuCambio from '../components/icons/BotonComienzaTuCambio.vue';
import Desventajas from '../components/icons/Desventajas.vue';
import Negativo from '../components/icons/Negativo.vue';
import Positivo from '../components/icons/Positivo.vue';
import Suscripciones from '../components/Suscripciones.vue';

       const ventajas= {
            planificacion: "Te damos un plan de entrenamiento y nutrición que consiste en una guía día a día con la que sabrás exactamente qué hacer, diseñado por profesionales para crear un camino claro hacia tus objetivos.",
            ejercicio: "Rutinas guiadas en poco tiempo y efectivas, dirigidas por profesionales que te enseñan la técnica correcta para maximizar los resultados y minimizar el riesgo de lesiones. Puedes elegir entre entrenamientos con peso corporal o material casero, adaptados a cualquier nivel y desde cualquier lugar. Con más de 1000 entrenamientos que incluyen diversas metodologías como cardio, fuerza, yoga, pilates… y nuevo contenido todas las semanas, con lo que siempre tienes variedad.",
            alimentacion: "Un menú fácil, saludable y delicioso acorde con tu objetivo. Acompañado de educación nutricional para que aprendas de forma progresiva, realista y sostenible cómo incorporar cambios en tu alimentación. Además de usar herramientas prácticas diseñadas a partir de evidencia científica.",
            motivacion: "Estarás acompañado por personas con tus mismos objetivos, algo que la ciencia ha demostrado que multiplica por diez tus posibilidades de obtener resultados. La comunidad proporciona un ambiente de apoyo y camaradería, esencial para mantener la constancia y la motivación. Participarás en desafíos, sorteos y sorpresas que mantienen tu interés y compromiso.",
            Habitos: "Los planes están diseñados con la ciencia de los hábitos, lo que te permitirá integrar un estilo de vida saludable en tu vida diaria de forma escalonada, sin depender únicamente de la motivación. Evitarás el abandono y el efecto rebote. Lograrás un cambio mental, físico y de salud que mantendrás a lo largo de tu vida, en vez de ser algo esporádico y con recaídas."
        }
       const desventajas= {
            planificacion: "Tienes que crear tus propios entrenamientos y planes de nutrición sin conocimiento previo. Te encontrarás buscando recomendaciones en internet, resultando en planes desorganizados y poco efectivos. Esto puede hacerte sentir perdido y abrumado, dificultando el camino hacia tus objetivos.",
            ejercicio: "Diseñar entrenamientos efectivos y mantener la variedad será un desafío. Sin una guía adecuada, es probable que tus rutinas se vuelvan repetitivas e ineficientes, llevándote al aburrimiento y a la desmotivación. Realizarás ejercicios con una técnica incorrecta, aumentando el riesgo de lesiones. La falta de una progresión puede resultarte en estancamiento y frustración.",
            alimentacion: "Seguirás dietas que encuentres por internet sin garantías de estar siguiendo una alimentación saludable ni sostenible. Estas dietas restringen una gran cantidad de alimentos, resultando en planes poco saludables que acabarás abandonando. Esto puede llevarte a desarrollar una relación poco saludable con la comida, generando ansiedad y frustración debido a la falta de nutrientes esenciales.",
            motivacion: "Te enfrentarás solo a un gran desafío sin el apoyo de otras personas. La falta de una comunidad y de objetivos claros hará que pierdas la constancia y la motivación. Después de la primera semana te sentirás desanimado y querrás abandonar.",
            Habitos: "El error más común es intentar realizar cambios drásticos de un día para otro. Solo podrás mantener estos cambios por un breve tiempo, ya que tu cerebro no está preparado para adaptarse rápidamente. Cada vez que fallas al intentarlo, disminuye tus probabilidades de obtener resultados, llevando a recaídas y a la pérdida de los avances logrados."
        }

  </script>
  