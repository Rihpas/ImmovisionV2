async function fetchData() {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simule un délai de 3s
    return { message: "Données chargées avec succès !" };
}

export default async function DashboardPage() {
    const data = await fetchData();

    return (
        <div>
            <h2 className="text-2xl font-bold">Tableau de bord</h2>
            <p>{data.message}</p>
        </div>
    );
}