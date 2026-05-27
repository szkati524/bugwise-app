import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

type Order = { id: number; name: string };
type Family = { id: number; name: string };
type Habitat = { id: number; name: string };

export function EditInsect() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [insect, setInsect] = useState<any>({
    commonName: "",
    latinName: "",
    englishName: "",
    description: "",
    orderId: null,
    orderName: "",
    orderLatinName: "",
    familyId: null,
    familyName: "",
    familyLatinName: "",
    habitatId: null,
    habitatName: "",
    imageUrls: [],
    tags: [],
    isProtected: false,
    dangerLevel: "",
    dangerLevelCode: "",
    templateQuestions: []
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [habitats, setHabitats] = useState<Habitat[]>([]);

  const [newOrder, setNewOrder] = useState({ name: "", latinName: "" });
  const [newFamily, setNewFamily] = useState({ name: "", latinName: "" });

  const [creatingOrder, setCreatingOrder] = useState(false);
  const [creatingFamily, setCreatingFamily] = useState(false);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8083/api/insects/${id}`),
      axios.get(`http://localhost:8083/api/orders`),
      axios.get(`http://localhost:8083/api/families`),
      axios.get(`http://localhost:8083/api/habitats`)
    ]).then(([i, o, f, h]) => {
      setInsect(i.data);

      setOrders(Array.isArray(o.data) ? o.data : []);
      setFamilies(Array.isArray(f.data) ? f.data : []);
      setHabitats(Array.isArray(h.data) ? h.data : []);

      setLoading(false);
    });
  }, [id]);

  const handleUpdate = async () => {
    const payload = {
      id: insect.id,
      commonName: insect.commonName,
      latinName: insect.latinName,
      englishName: insect.englishName,
      description: insect.description,

      orderId: insect.orderId ?? null,
      orderName: creatingOrder ? newOrder.name : insect.orderName,
      orderLatinName: creatingOrder ? newOrder.latinName : insect.orderLatinName,

      familyId: insect.familyId ?? null,
      familyName: creatingFamily ? newFamily.name : insect.familyName,
      familyLatinName: creatingFamily ? newFamily.latinName : insect.familyLatinName,

      habitatId: insect.habitatId ?? null,
      habitatName: insect.habitatName,

      imageUrls: insect.imageUrls ?? [],
      tags: insect.tags ?? [],
      isProtected: insect.isProtected ?? false,
      dangerLevel: insect.dangerLevel ?? "",
      dangerLevelCode: insect.dangerLevelCode ?? "",
      templateQuestions: insect.templateQuestions ?? []
    };

    console.log("PAYLOAD:", payload);

    await axios.put(
      `http://localhost:8083/api/insects/${id}`,
      payload
    );

    navigate(`/insects/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 space-y-4">

      
      <input
        value={insect.commonName || ""}
        onChange={(e) =>
          setInsect({ ...insect, commonName: e.target.value })
        }
        placeholder="Common name"
      />

      <input
        value={insect.latinName || ""}
        onChange={(e) =>
          setInsect({ ...insect, latinName: e.target.value })
        }
        placeholder="Latin name"
      />

      <input
        value={insect.englishName || ""}
        onChange={(e) =>
          setInsect({ ...insect, englishName: e.target.value })
        }
        placeholder="English name"
      />

   
      <select
        value={insect.orderId ?? ""}
        onChange={(e) => {
          if (e.target.value === "NEW") {
            setCreatingOrder(true);
            setInsect({
              ...insect,
              orderId: null,
              orderName: "",
              orderLatinName: ""
            });
          } else {
            setCreatingOrder(false);
            const selected = orders.find(o => o.id === Number(e.target.value));

            setInsect({
              ...insect,
              orderId: Number(e.target.value),
              orderName: selected?.name ?? "",
              orderLatinName: ""
            });
          }
        }}
      >
        <option value="">Select order</option>
        {orders.map((o) => (
          <option key={o.id} value={o.id}>
            {o.name}
          </option>
        ))}
        <option value="NEW">+ NEW</option>
      </select>

      {creatingOrder && (
        <>
          <input
            placeholder="Order name"
            value={newOrder.name}
            onChange={(e) =>
              setNewOrder({ ...newOrder, name: e.target.value })
            }
          />
          <input
            placeholder="Latin name"
            value={newOrder.latinName}
            onChange={(e) =>
              setNewOrder({ ...newOrder, latinName: e.target.value })
            }
          />
        </>
      )}

      <select
        value={insect.familyId ?? ""}
        onChange={(e) => {
          if (e.target.value === "NEW") {
            setCreatingFamily(true);
            setInsect({
              ...insect,
              familyId: null,
              familyName: "",
              familyLatinName: ""
            });
          } else {
            setCreatingFamily(false);

            const selected = families.find(f => f.id === Number(e.target.value));

            setInsect({
              ...insect,
              familyId: Number(e.target.value),
              familyName: selected?.name ?? "",
              familyLatinName: ""
            });
          }
        }}
      >
        <option value="">Select family</option>
        {families.map((f) => (
          <option key={f.id} value={f.id}>
            {f.name}
          </option>
        ))}
        <option value="NEW">+ NEW</option>
      </select>

      {creatingFamily && (
        <>
          <input
            placeholder="Family name"
            value={newFamily.name}
            onChange={(e) =>
              setNewFamily({ ...newFamily, name: e.target.value })
            }
          />
          <input
            placeholder="Latin name"
            value={newFamily.latinName}
            onChange={(e) =>
              setNewFamily({ ...newFamily, latinName: e.target.value })
            }
          />
        </>
      )}

      <button onClick={handleUpdate}>
        SAVE
      </button>
    </div>
  );
}