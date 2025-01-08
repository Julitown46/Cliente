        // E1
        const links = document.getElementsByTagName('a');
        console.log("Numero de enlaces: " + links.length);

        // Ej2
        const penultimoLink = links[links.length - 2];
        console.log("Direccion del penultimo enlace: " + penultimoLink.href);

        // Ej3
        const contadorLinkInstituto = Array.from(links).filter(link => link.href.includes('https://iesbelen.org/')).length;
        console.log("Numero de veces que aparece el link del instituto: " + contadorLinkInstituto);

        // Ej4
        const tercerParrafo = document.getElementsByTagName('p')[2];
        const links3 = tercerParrafo.getElementsByTagName('a').length;
        console.log("Numero de enlaces del tercer parrafo: " + links3);