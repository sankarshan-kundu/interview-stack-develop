import React, { useEffect, useState } from "react";
import PageWrapper from '../PageWrapper';
import { Product } from "../../components/interfaces";
import { getProductsData } from "../ApiHelper";
import Spinner from "../../components/Spinner/Spinner";
import { DragDropContext, Draggable, DraggableProvided, Droppable } from "react-beautiful-dnd";
import DraggableProductCard from "../../components/DraggableProductCard/DraggableProductCard";

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR'
};

const ProductsPage = () => {

  /*
    TODO:
      When the drag ends we want to keep the status persistant across logins. 
      Instead of modifying the data locally we want to do it serverside via a post
      request
  */

  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState<Product[]>([]);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getProductsData();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    const sourceClone = Array.from(data);
    const [removed] = sourceClone.splice(source.index, 1);
    sourceClone.splice(destination.index, 0, removed);
    setData(sourceClone);
  };

  useEffect(() => {
    getProducts();
  }, []);

  let content;

  if (loadingState === DATA_STATES.waiting)
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  else if (loadingState === DATA_STATES.loaded)
    content = (

      <div
        className="flex flex-row justify-center w-full pt-4"
        data-testid="products-container"

      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="products">
            {(provided) => (
              <div
                ref={provided.innerRef}
                className='bg-neutral-500 p-4 w-full grid grid-cols-9 gap-4'
                data-testid='droppable-container-products'
              >
                {
                  data && data.length > 0 && data.map((item, index) => (
                    <Draggable
                      key={item.ProductID}
                      draggableId={item.ProductID.toString()}
                      index={index}
                    >
                      {(provided: DraggableProvided) => (
                        <DraggableProductCard
                          ProductID={item.ProductID}
                          ProductName={item.ProductName}
                          ProductPhotoURL={item.ProductPhotoURL}
                          draggableProvided={provided} />
                      )}
                    </Draggable>
                  )) || <div className="font-bold text-white">No products avilable</div>
                }
                {provided.placeholder}
              </div>)
            }
          </Droppable>
        </DragDropContext>
      </div>)
  else
    content = (
      <div
        className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-red-500"
        data-testid="error-container"
      >
        An error occured fetching the data!
      </div>
    );

  return (
    <PageWrapper>
      {content}
    </PageWrapper>
  );
};

export default ProductsPage
