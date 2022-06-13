import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  //Gelecek olan datayı yansıtmak ıstıyoruz.Gelen satayı setData seklınde bır seye eşitlememız grekır kı bu datayı kullanabılelım
  //Bunun için de useState kullancağız
  const [data, setData] = useState("");
  const [tarih, setTarih] = useState("");
  //datayı çekmek ıcınse axios kullanacagız.Axıos async işlem oldugu ıcın useEffect kullanmamız gerekıyor
  // .then((res) => setData(res)) : burada meke ıstenen ;
  //= axıosu kullanarak lınkdekı datayı al.res'in ıcıne koy,res'de tutulan datayı ıse setData'nın ıcıne koy,o da zaten data'nın ıcıne set edecek
  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/ozanerturk/covid19-turkey-api/master/dataset/timeline.json"
      )
      .then((res) => setData(res.data[tarih]))
      .catch((error) => console.log(error));
  }, [data, tarih]);
  //yukarıda [data,tarih] kısmı boş bırakılırsa(useEffect'in dependecy kısmı) sayfadakı ılk render'ı ccagırır ve bekler
  //ancak datada ve tarıhte degısıklık oldugunda tekrar render et

  return (
    <div className="App">
      <div className="container">
        <div className="row">
          <div className="col-md-8 mx-auto mt-4">
            <h2 className="text-light">
              Türkiye Güncel Covid-19 İstatistikleri
            </h2>

            <input
              placeholder="GG/AA/YYYY"
              classname="form-control"
              onChange={(e) => setTarih(e.target.value)}
            ></input>
            <table className="table text-light">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Test sayısı</th>
                  <th scope="col">Günlük hasta sayısı</th>
                  <th scope="col">Toplam hasta sayısı</th>
                  <th scope="col">Günlük vefat sayısı</th>
                  <th scope="col">Toplam iyileşen sayısı</th>
                </tr>
              </thead>
              <tbody>
                <tr className={data === undefined ? "bg-danger" : "bg-success"}>
                  <th scope="row">1</th>
                  <td>
                    {data === undefined ? "Data beklenmektedir" : data.tests}
                  </td>
                  <td>
                    {data === undefined ? "Data beklenmektedir" : data.patients}
                  </td>
                  <td>
                    {data === undefined
                      ? "Data beklenmektedir"
                      : data.totalPatients}
                  </td>
                  <td>
                    {data === undefined ? "Data beklenmektedir" : data.deaths}
                  </td>
                  <td>
                    {data === undefined
                      ? "Data beklenmektedir"
                      : data.totalRecovered}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
