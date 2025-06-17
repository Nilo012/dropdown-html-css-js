

/*=============== BUTTON ACTIVE PRODUCTS ===============*/

document.addEventListener("DOMContentLoaded", () => {
  // Función auxiliar para actualizar el icono de la flecha
  function updateArrowIcon(buttonElement, isOpen) {
    // Selecciona el último <i> dentro del botón, que es el icono de la flecha
    const arrowIcon = buttonElement.querySelector("i:last-child");
    if (arrowIcon) {
      if (isOpen) {
        // Si el menú se está abriendo o ya está abierto, muestra la flecha hacia arriba
        arrowIcon.classList.remove("ri-arrow-drop-down-line");
        arrowIcon.classList.add("ri-arrow-drop-up-line");
      } else {
        // Si el menú se está cerrando o ya está cerrado, muestra la flecha hacia abajo
        arrowIcon.classList.remove("ri-arrow-drop-up-line");
        arrowIcon.classList.add("ri-arrow-drop-down-line");
      }
    }
  }

  // Selecciona todos los contenedores de cada grupo de dropdown (botón + lista)
  const dropdownGroups = document.querySelectorAll(".select-btn-group");

  dropdownGroups.forEach((group) => {
    // Dentro de cada grupo, encontramos sus elementos específicos
    const buttonDropdown = group.querySelector(".button-dropdown");
    const optionsList = group.querySelector(".options");
    const optionTexts = group.querySelectorAll(".option-text");

    if (buttonDropdown && optionsList) {
      // 1. Manejar el clic en el botón principal (Para Ellos / Para Ellas)
      buttonDropdown.addEventListener("click", (event) => {
        event.preventDefault(); // Evita el comportamiento predeterminado del enlace

        // Cierra cualquier otro submenú abierto y revierte su icono
        document.querySelectorAll(".options.active").forEach((openMenu) => {
          if (openMenu !== optionsList) {
            // Si NO es el menú en el que acabamos de hacer clic
            openMenu.classList.remove("active"); // Cerrar el menú
            const otherGroup = openMenu.closest(".select-btn-group");
            if (otherGroup) {
              const otherButtonDropdown =
                otherGroup.querySelector(".button-dropdown");
              updateArrowIcon(otherButtonDropdown, false); // Revertir icono a flecha hacia abajo
            }
          }
        });

        // Alterna la clase 'active' en la lista de opciones de ESTE grupo
        optionsList.classList.toggle("active");

        // Actualiza el icono del botón actual según el nuevo estado del menú
        updateArrowIcon(
          buttonDropdown,
          optionsList.classList.contains("active")
        );
      });

      // 2. Manejar el clic en los sub-ítems (Billeteras, Monederos, etc.)
      optionTexts.forEach((optionText) => {
        optionText.addEventListener("click", (event) => {
          if (!(optionText instanceof HTMLAnchorElement)) {
            event.preventDefault();
          }

          // Cierra el menú y actualiza icono
          optionsList.classList.remove("active");
          updateArrowIcon(buttonDropdown, false);
        });
      });

      // 3. Opcional: Cerrar el menú al hacer clic fuera
      document.addEventListener("click", (event) => {
        // Si el clic NO fue dentro de este grupo (botón o lista) Y el menú está abierto
        if (
          !group.contains(event.target) &&
          optionsList.classList.contains("active")
        ) {
          optionsList.classList.remove("active");
          // Revertir el icono del botón padre
          updateArrowIcon(buttonDropdown, false);
        }
      });
    }
  });
});