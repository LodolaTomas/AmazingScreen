# AmazingScreen

<a href="https://amazingscreens.com.ar/home">AmazingScreenArgentina</a> es una web page para realizar ventas de productos gaming y profesionales. La idea principal fue que la persona no comprara directamente a travez de la pagina sino mediante consultar el stock y hablar directamente con los vendedores por medio de whatsapp.

Imagen de la estadistica de <a href="https://developers.google.com/web/tools/lighthouse?hl=es">Lighthouse</a>. <br>
![image](https://user-images.githubusercontent.com/52363833/134788445-f7b1850d-a5a8-4eba-9df6-3edd4a45a503.png)

aki una foto de como es la pagina en su totalidad.
![image](https://user-images.githubusercontent.com/52363833/134788308-5ae4dee8-d763-4013-bff8-866bc0518c93.png)


Me enfoque en hacer que el diseño sea "lindo"(aunq no sea lo mio), responsive, dinamico, aprender un poco mas de SEO en cuanto a la forma de escribir html y usar buenas practicas en toda su estructura. Tambien me llevo tiempo entender como indexa google sus paginas, que cosas tengo que hacer para que se posicione mejor la pagina que otras, usar el .htcaccess para el redireccionamiento, sin www. y entender porque guardar en cache era una buena practica para mejorar el rendimiento de la pagina, usar G-ZIP y como hacerlo todo sin usar Wordpress(cada cosa que buscaba habia un plugin de Wordpress que lo solucionaba :'v ). 

Para el diseño mobile obviamente use bootstrap como se puede apreciar claramente en toda la pagina, es sencillo aunque en el fondo sus colores y su diseño me hace sentir que no es tan profecional.

Tanto la lista de filtros y el buscador se usaron pipes y la verdad que quedo bastante bien, pienso en ponerle algo de estilos para que no sea tan brusco cuando se busca o filtra, en todo los estilos de los componentes se utilizo scss, se utilizo el CanActivate para la parte de admin ya que la idea siempre fue hacer un ABM de los productos y que sean manejados por la empresa. Para la creacion de los productos se uso POO, que es algo que mayormente no uso cotidianamente, pero en este caso se me dio por utilizar y con esto venia la herencia y polimorfismo. Todas sus altas, bajas y modificaciones de los productos se utilizo la mayor reutilizacion de codigo y poder tener cada alta o cada componente poder ser organizado.

Para poder guardar los datos se utilizo Firebase en todo su explendor usando NOSQL para guardar los productos y consumirlos, al principio subi el Firebaseconfig y tuve que borrarlo y generar uno nuevo, todo por mi miedo a tener alguna vulnerabilidad en la pagina(full persegido).

 
##Proyecto
Angular CLI: 12.2.7
Node: 14.16.0
Package Manager: npm 7.21.0
Firebase : 8.6.1
 
## Build

1. npm install
2. ng serve --o
y para deployar, ng build

