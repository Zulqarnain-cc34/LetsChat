export const SendNotification = (
    title: string,
    message: string,
    type: string,
    duration: number = 5000
) => {
    return {
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: duration,
            onScreen: true,
        },
    };
};
