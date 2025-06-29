provider "google" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "cloud_run" {
  service = "run.googleapis.com"
}

resource "google_project_service" "cloud_sql" {
  service = "sqladmin.googleapis.com"
}

resource "google_project_service" "container_registry" {
  service = "containerregistry.googleapis.com"
}

resource "google_sql_database_instance" "postgres" {
  name             = "quickquote-postgres"
  database_version = "POSTGRES_14"
  region           = var.region

  settings {
    tier = "db-f1-micro"
  }
}

resource "google_sql_user" "postgres_user" {
  name     = var.db_user
  instance = google_sql_database_instance.postgres.name
  password = var.db_password
}

resource "google_sql_database" "db" {
  name     = var.db_name
  instance = google_sql_database_instance.postgres.name
}

resource "google_cloud_run_service" "api" {
  name     = "quickquote-api"
  location = var.region

  template {
    spec {
      containers {
        image = var.api_image

        env {
          name  = "DATABASE_URL"
          value = "postgresql://${var.db_user}:${var.db_password}@${google_sql_database_instance.postgres.connection_name}/${var.db_name}"
        }

        ports {
          container_port = 8080
        }
      }
    }
  }

  traffics {
    percent         = 100
    latest_revision = true
  }
}

resource "google_cloud_run_service_iam_member" "noauth" {
  service  = google_cloud_run_service.api.name
  location = var.region
  role     = "roles/run.invoker"
  member   = "allUsers"
}
