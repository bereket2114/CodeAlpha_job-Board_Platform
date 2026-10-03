const statusDropdowns = document.querySelectorAll('.status-dropdown')

statusDropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', async(event)=> {
        const candidateId = event.target.dataset.id
        const newStatus = event.target.value

        try{
            const response = await fetch(`/applications/update-status/${candidateId}/status`, {
                method: "put",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                        status: newStatus
                    })
            })
            return response.json()
        } catch(err){
            console.error("Error updating candidate status:", err)
        }
    })

})