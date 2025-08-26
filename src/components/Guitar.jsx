export default function Guitar({guitar,addToCart}) {
//guitar representa el objeto de todas las guitarras del archivo db.js

  const {name,image,description,price} = guitar;

  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>
        {description}
        </p>
        <p className="fw-black text-primary fs-3">${price}</p>
        <button type="button" className="btn btn-dark w-100"                                             onClick={() => addToCart(guitar)} /* en prevCart se pasa en automatico el state del carrito o sea cart*/>
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
