output "cloud_run_url" {
  description = "URL du service Cloud Run"
  value       = google_cloud_run_service.api.status[0].url
}
