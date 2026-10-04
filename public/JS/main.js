const statusDropdowns = document.querySelectorAll('.status-dropdown');

statusDropdowns.forEach(dropdown => {
    dropdown.addEventListener('change', async (event) => {
        const candidateId = event.target.dataset.id;
        const newStatus = event.target.value;

        if (!newStatus) return;

        const previousStatus = event.target.dataset.previousStatus || '';
        event.target.disabled = true;

        try {
            const response = await fetch(`/applications/update-status/${candidateId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || 'Unable to update application status.');
            }

            event.target.dataset.previousStatus = newStatus;

            const currentStatus = event.target.closest('.status-row')?.querySelector('strong');
            if (currentStatus) currentStatus.textContent = newStatus;
        } catch (err) {
            console.error('Error updating candidate status:', err);
            alert(err.message || 'Could not update the application status.');
            event.target.value = previousStatus;
        } finally {
            event.target.disabled = false;
        }
    });

    eventInitStatus(dropdown);
});

function eventInitStatus(dropdown) {
    const selected = dropdown.options[dropdown.selectedIndex];
    if (selected && selected.value) {
        dropdown.dataset.previousStatus = selected.value;
    }
}
