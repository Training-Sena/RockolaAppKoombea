module V1
  class SongsController < ApplicationController
    before_action :authenticate_request, only: [:create, :destroy]
    before_action :set_playlist
    before_action :set_playlist_song, only: [:show, :update, :destroy]

    # GET /playlists/:playlist_id/songs
    def index
      json_response(@playlist.songs)
    end

    # POST /playlists/:playlist_id/songs
    def create
      @playlist.songs.create!(song_params)
      json_response(@playlist, :created)
    end

    # DELETE /playlists/:playlist_id/songs/:id
    def destroy
      @song.destroy
      head :no_content
    end

    private

    def song_params
      params.permit(:title, :video_id)
    end

    def set_playlist
      @playlist = Playlist.find(params[:playlist_id])
    end

    def set_playlist_song
      @song = @playlist.songs.find_by!(id: params[:id]) if @playlist
    end
  end
end