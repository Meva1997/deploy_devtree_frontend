import Header from "../components/Header";
import SearchForm from "../components/SearchForm";

export default function HomeView() {
  return (
    <>
      <Header />

      <main className="min-h-screen py-10 bg-gray-100 lg:bg-[url(/bg.svg)] bg-no-repeat bg-top-right bg-size-[60%]">
        <div className="max-w-6xl mx-auto mt-10 ">
          <div className="px-10 space-y-6 lg:w-1/2 lg:p-0">
            <h1 className="text-6xl font-black">
              Connect All Your{" "}
              <span className="text-cyan-400">Social Profiles</span> in One
              Place
            </h1>
            <p className="text-lg text-gray-600">
              Simplify your online presence with a single, shareable link to all
              your social networks.
            </p>
            <SearchForm />
          </div>
        </div>
      </main>
    </>
  );
}
