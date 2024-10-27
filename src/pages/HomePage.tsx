import DisplayCard from "@/comps/DisplayCard";
import CategoryCollage from "@/comps/HomePageCategory";
import ProductOfTheDay from "@/comps/ProductOfTheDay";
import ProductSection from "@/comps/ProductSection";

const HomePage = () => {
  return (
    <div>
      <ProductSection type="new" />
      <DisplayCard image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <ProductSection type="sale" />
      <ProductOfTheDay image="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      <ProductSection type="new" />
      <CategoryCollage />
    </div>
  );
};

export default HomePage;
