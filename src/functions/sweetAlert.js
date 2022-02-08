import Swal from "sweetalert2";

export const customAlert = async ({ ...props }) => {
  const descriptionOptions = {
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    ...props.description,
  };
  const imgOptions = {
    imageUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    imageWidth: "30vw",
    imageAlt: "Custom image",
    ...props.img,
  };
  const confirmButton = {
    confirmButtonColor: "#3085d6",
    confirmButtonText: "Confirm!",
    ...props.confirm,
  };
  const cancelButton = {
    showCancelButton: true,
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancel!",
    ...props.cancel,
  };

  const denyButton = {
    showDenyButton: true,
    denyButtonText: `Don't save`,
    ...props.denny,
  };

  const setIcon = {
    icon: "question",
    ...props.icon,
  };

  const positionOptions = {
    position: "top-left",
    ...props.position,
  };

  const timerOptions = {
    timer: 2000,
    ...props.timer,
  };

  const preConfirmOptions = {
    showLoaderOnConfirm: true,
    preConfirm: () => {},
    allowOutsideClick: () => !Swal.isLoading(),
    ...props.preConfirm,
  };

  let option = {
    ...descriptionOptions,
    ...confirmButton,
  };

  if (props.img) {
    option = { ...option, ...imgOptions };
  } else {
    option = { ...option, ...setIcon };
  }
  if (props.cancel) option = { ...option, ...cancelButton };
  if (props.denny) option = { ...option, ...denyButton };
  if (props.preConfirm) option = { ...option, ...preConfirmOptions };
  if (props.position) option = { ...option, ...positionOptions };
  if (props.timer) option = { ...option, ...timerOptions };

  return Swal.fire({
    ...option,
  }).then((result) => {
    if (result.isConfirmed) {
      if (props.then) props.then();
    } else if (result.isDenied) {
      // Swal.fire('Changes are not saved', '', 'info')
    }
  });
};
