import Banner from "../../components/client/banner";
import SearchForm from "../../components/client/searchForm";
import SuggestList from "../../components/client/suggestList";
import JobList from "../../components/client/jobList";

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