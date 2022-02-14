import React from "react";

// Got Card component from https://kimia-ui.vercel.app/components/card

const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
  cardBody: `block flex-grow flex-shrink p-5`,
  cardTitle: `font-medium text-gray-700 mb-3`,
  cardText: `text-gray-500`,
};

const inlineStyle = {
  boxShadow: "0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)",
};

function Card({ children }) {
  return (
    <div className={style.card} style={inlineStyle}>
      {children}
    </div>
  );
}

function CardBody({ children }) {
  return <div className={style.cardBody}>{children}</div>;
}

function CardTitle({ children }) {
  return <div className={style.cardTitle}>{children}</div>;
}

const AvailableIngredients = () => {
  return (
    <div className="container mx-auto h-screen w-1/2 text-center justify-around">
      <h1 className="text-2xl">Available ingredients</h1>
      <h1 className="font-bold">Base</h1>
      <div className="flex flex-wrap">
        <div className="w-full md:w-4/12 mb-6 md:mb-0 md:p-3">
          <Card>
            <img
              className="max-w-full h-auto md:h-48"
              src="https://drive.google.com/uc?export=view&id=1KULwHaygOZFVPkRnzVkYj4zItod4AZhn"
              alt="ingredient"
            />
            <CardBody>
              <CardTitle className="text-lg">Milk Tea</CardTitle>
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-4/12 mb-6 md:mb-0 md:p-3">
          <Card>
            <img
              className="max-w-full h-auto md:h-48"
              src=""
              alt="ingredient"
            />
            <CardBody>
              <CardTitle className="text-lg">Ovaltine</CardTitle>
            </CardBody>
          </Card>
        </div>
        <div className="w-full md:w-4/12 mb-6 md:mb-0 md:p-3">
          <Card>
            <img
              className="max-w-full h-auto md:h-48"
              src=""
              alt="ingredient"
            />
            <CardBody>
              <CardTitle className="text-lg">Chocolate milk</CardTitle>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AvailableIngredients;