import Banner from "../../components/banner";
import SearchForm from "../../components/searchForm";
import SuggestList from "../../components/suggestList";
import JobList from "../../components/jobList";

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