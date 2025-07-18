import Banner from "../../components/client/Banner/banner";
import SearchForm from "../../components/client/content/searchForm";
import SuggestList from "../../components/client/content/suggestList";
import JobList from "../../components/client/content/jobList";

const Home = () => {
  return (
    <div className="wrapper container">
      <Banner />
      <SearchForm />
      <SuggestList />
      <JobList />
    </div>
  );
};

export default Home;